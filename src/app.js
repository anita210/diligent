import { list, formatList, format, add } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams } from './validate.js';
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
      if (params.length > 0 && Number.isInteger(Number(params[0]))) {
        const todoId = params[0]
        const completed = complete(todoStore, todoId);
      } else {
        throw new AppError(`the ID of the todo MUST be a number`)
      }
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
