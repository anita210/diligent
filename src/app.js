import { list, formatList, format, add, updateTitle } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateCompleteParam, validateUpdateTitleParam } from './validate.js';
import { complete } from './complete.js';


export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case 'list':
      const todos = list(todoStore)
      display([
        ...formatList(todos), 
        `You have ${todos.length} todos.`
      ]);
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)])
      break;
    case 'complete':
        const todoId = validateCompleteParam(params[0])
        const completed = complete(todoStore, todoId);
        display([`Todo marked as complete:`]);
        display([format(completed)]);
      break;
    case 'update-title':
        const editParams = validateUpdateTitleParam();
        const updated = updateTitle(todoStore, editParams)
        display([`Todo updated:`]);
        display([format(updated)]);
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
