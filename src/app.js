import { list, formatList, format, add, updateTitle, complete, findById, deleteTodo } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateExistenceOfTodo, validateIdInput, validateId, validateUpdateTitleParam } from './validate.js';
import { displaySingle } from './display.js';

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
    case 'complete':
        const todoId = validateId(todoStore.get(), params)
        const completed = complete(todoStore, todoId);
        display([`Todo marked as complete: ${format(completed)}`]);
      break;
    case 'update-title':
        const editParams = validateUpdateTitleParam(todoStore, params);
        const updated = updateTitle(todoStore, editParams)
        display([`Todo updated:`]);
        display([format(updated)]);
        break;
        case 'delete':
      const deleteParams = validateId(todoStore.get(), params)
      const deleted = deleteTodo(todoStore, id)
      display([`Todo deleted: ${format(deleted)}`]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
