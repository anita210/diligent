import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateId(todos, param) {
  if (isNaN(Number(param))) {
    throw new AppError('The ID must be a number');
  }
  if (Number(param) < 1) {
    throw new AppError('The ID must be a positive number');
  }
  if (todoId > todos.length) {
    throw new AppError(`out of bound, you have ${todos.length} todos.`);
  }
  return param;
}

export function validateUpdateTitleParam(params) {
  const [id, title] = params;
  validateId(id);
  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  if (params.length !== 2) {
    throw new AppError('Give an ID (number), and title (string) in parenthesis.');
  }
  return params;
}