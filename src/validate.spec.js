import { validateAddParams, validateExistenceOfTodo, validateIdInput, validateCompleteParam, validateStatusInput, checkIfListByStatusEmpty } from "./validate";

describe("validateCompleteParam", () => {
  it("should be a number", () => {
    const param = 1;
    const expected = 1;
    const current = validateCompleteParam(param)
    expect(current).toStrictEqual(expected);
  })

  it("should be a number", () => {
    const param = "string";
    expect(() => validateCompleteParam(param)).toThrow('The ID must be a number')
  })

  it("should be a positive number", () => {
    const param = -1;
    expect(() => validateCompleteParam(param)).toThrow('The ID must be a positive number')
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
})

describe('validateIdInput', () => {

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
})

describe('validateExistenceOfTodo', () => {

  it('should throw when there is no todo found with the given id', () => {
    const params = undefined;

    expect(() => validateExistenceOfTodo(params))
      .toThrow('No item found with this id.')
  })

  it('should return todo when there is an existing todo found with the given id', () => {
    const todo = { id: 1, title: 'Todo 1', done: false }
    const expected = { id: 1, title: 'Todo 1', done: false };

    const current = validateExistenceOfTodo(todo);

    expect(current).toStrictEqual(expected);
  })
})

describe('validateStatusInput', () => {

  it('should throw when the params are invalid, anything else that is "done" or "not-done"', () => {
    const params = 'test'
    expect(() => validateStatusInput(params)
      .toThrow(`${params} is not a valid input. Use 'done' or not 'done'.`))
  })

  it('should return the params if they are "done"', () => {
    const params = ['done'];
    const expected = ['done'];

    const current = validateStatusInput(params);

    expect(current).toStrictEqual(current);

  })

  it('should return the params if they are "not-done"', () => {
    const params = ['not-done'];
    const expected = ['not-done'];

    const current = validateStatusInput(params);

    expect(current).toStrictEqual(current);

  })

})
describe('checkIfListByStatusEmpty', () => {
  it('should throw if there is no item found with the given status', () => {
    const todos = [];

    expect(() => checkIfListByStatusEmpty(todos)
      .toThrow(`No item with this status is found.`))
  })

  it('should return the list if it is not empty', () => {
    const todos = [
      { id: 2, title: 'Todo 1', done: true },
      { id: 4, title: 'Todo 1', done: true }
    ];
    const expected = [
      { id: 2, title: 'Todo 1', done: true },
      { id: 4, title: 'Todo 1', done: true }
    ]

    const current = checkIfListByStatusEmpty(todos);

    expect(current).toStrictEqual(expected);
  })
})
