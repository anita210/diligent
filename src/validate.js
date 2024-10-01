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
  console.log(param)
  if (isNaN(Number(param))) {
    throw new AppError('The ID must be a number');
  }
  if (Number(param) < 1) {
    throw new AppError('The ID must be a positive number');
  }
  if (Number(param) > todos.length) {
    throw new AppError(`Out of bound, you have ${todos.length} todos.`);
  }
  return Number(param);
}

export function validateUpdateTitleParam(todoStore, params) {
  const [id, title] = params;
  validateId(todoStore, Number(id));

  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  if (params.length !== 2) {
    throw new AppError('Give an ID (number), and title (string) in parenthesis.');
  }
  return params;
}