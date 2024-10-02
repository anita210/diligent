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

export function validateCompleteParam(param){
  if(isNaN(Number(param))){
    throw new AppError('The ID must be a number');
  }
  if(Number(param) < 1){
    throw new AppError('The ID must be a positive number');
  }
  return param;
}

 Show-labels
export function validateLabelParams(params) {
  if (params.length !== 2) {
    throw new AppError('You must provide a todo ID and a label.');
  }
  const [id, label] = params;
  validateIdInput([id]);
  if (typeof label !== 'string' || label.length < 1) {
    throw new AppError('The label must be a non-empty string.');
  }
  return [id, label];
}

export function validateTitleInput(params) {
  if (params.length !== 1) {
    throw new AppError('Please provide exactly one title.');
  }
  const [title] = params;
  if (typeof title !== 'string' || title.length === 0) {
    throw new AppError('The title must be a non-zero length string.');
  }
  return title;
}
 main

export function validateDeleteLabelParams(params) {
  if (params.length !== 2) {
    throw new AppError('You must provide a todo ID and a label to delete.');
  }
  
  const [id, label] = params;
  
  validateIdInput([id]);
  if (typeof label !== 'string' || label.length < 1) {
    throw new AppError('The label must be a non-empty string.');
  }
  
  return [id, label]; 
}

