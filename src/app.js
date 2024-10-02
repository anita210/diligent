import { list, formatList, format, add, findById, findByTitle } from './todo.js';
import { display, displaySingle } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateExistenceOfTodo, validateIdInput, validateCompleteParam, validateTitleInput } from './validate.js'; 
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
    case 'find-by-id':
      const validId = validateIdInput(params);
      const todosList = list(todoStore)
      const todo = findById(todosList, validId);
      const validTodo = validateExistenceOfTodo(todo);
      displaySingle(format(validTodo));
      break;
    case 'find-by-title':  
      const title = validateTitleInput(params);  
      const allTodos = list(todoStore);
      const matchingTodos = findByTitle(allTodos, title);
      if (matchingTodos.length === 0) {
        display([`No todos found with title: ${title}`]);
      } else {
        display(formatList(matchingTodos));
      }
      break;
    case 'complete':
      const todoId = validateCompleteParam(params[0]);
      const completed = complete(todoStore, todoId);
      break;
      case 'add-label':
        const [todoIdLabel, label] = validateLabelParams(params);
        const updatedTodo = addLabel(todoStore, todoIdLabel, label);
        display(['Label added to Todo:', format(updatedTodo)]);
        break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
