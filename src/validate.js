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

export function validateCompleteParam(param){
  if(isNaN(Number(param))){
    throw new AppError('The ID must be a number');
  }
  if(Number(param) < 1){
    throw new AppError('The ID must be a positive number');

  }
  return param;
}