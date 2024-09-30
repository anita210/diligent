import { list, formatList, format, add } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateCompleteParam } from './validate.js';
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
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
