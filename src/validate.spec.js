import { validateAddParams, validateExistenceOfTodo, validateIdInput, validateCompleteParam } from "./validate";

describe("validateCompleteParam", ()=>{
it("should be a number", ()=>{
  const param = 1;
  const expected = 1;
  const current = validateCompleteParam(param)
  expect(current).toStrictEqual(expected);
})

it("should be a number", ()=>{
  const param = "string";
  expect(()=>validateCompleteParam(param)).toThrow('The ID must be a number')
})

it("should be a positive number", ()=>{
  const param = -1;
  expect(()=>validateCompleteParam(param)).toThrow('The ID must be a positive number')
})

})

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];

    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];

    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];

    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];

    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is contains a character that is not a number', () => {
    const params = 'a1'

    expect(() => validateIdInput(params))
      .toThrow('The ID must be a number higher than 0.')
  })

  it('should return the param when the param is a character that is a number', () => {
    const params = [1];
    const expected = [1];

    const current = validateIdInput(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when there is no todo found with the given id', () => {
    const params = undefined;

    expect(() => validateExistenceOfTodo(params))
      .toThrow('No item found with this id.')
  })

  it('should return todo when there is an existing todo found with the given id', () =>{
    const todo = { id: 1, title: 'Todo 1', done: false }
    const expected = { id: 1, title: 'Todo 1', done: false };

    const current = validateExistenceOfTodo(todo);

    expect(current).toStrictEqual(expected);
  })
})
