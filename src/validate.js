import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateIdInput(params) {
  const [id] = params;
  if(isNaN(Number(id)) || id < 1){
    throw new AppError('The ID must be a number higher than 0.')
  }
  return params;
}

export function validateExistenceOfTodo(todo) {
  if(!todo){
    throw new AppError('No item found with this id.')
  }
  return todo;
}

export function validateStatusInput(params) {
  const [status] = params
  if(params !== 'done' && params !== 'not-done'){
    throw new AppError(`${params} is not a valid input. Use 'done' or not 'done'.`)
  }
  return params;
}

export function checkIfListByStatusEmpty(todos) {
  if(!todos.length){
    throw new AppError(`No item with this status is found.`)
  }
  return todos;
}
