import { validateAddParams, validateId } from "./validate";


describe("validateId", ()=>{
const todos = ["test", "test", "test"];

it("should be a number", ()=>{
  const param = 1;
  const expected = 1;
  const current = validateId(todos, param)
  expect(current).toStrictEqual(expected);
})

it("should be a number", ()=>{
  const param = "string";
  expect(()=>validateId(todos, param)).toThrow('The ID must be a number')
})

it("should be a positive number", ()=>{
  const param = -1;
  expect(()=>validateId(todos, param)).toThrow('The ID must be a positive number')
})
it("should be in boundary", ()=>{
  const param = 4;
  expect(()=>validateId(todos, param)).toThrow(`Out of bound, you have ${todos.length} todos.`)

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