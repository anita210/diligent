import { AppError } from './app-error.js';

export function format(todo) {
  return `${todo.id} - [${todo.done ? 'x': ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format)
}

function nextId(todos) {
  const ids = todos.map(todo => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get();
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get()
  const newTodo = {
    title,
    done: false,
    id: nextId(todos)
  }
  const toStore = [...todos, newTodo]
  store.set(toStore)
  return newTodo;
}

export function findById(todos, id) {
  const todo = todos.filter((todo) => todo.id === Number(id));
  return todo[0];
}

export function findByStatus(todos, status) {
  const statusTodos = todos.filter((todo => todo.status === status));
  return statusTodos;
}

export function complete(todoStore, todoId) {
  const todos = todoStore.get();
  const todo = todos.find((todo) => todo.id == todoId);
  if (!todo) {
    throw new AppError(`Todo with ID ${todoId} not found.`);
  }
  if (todo.done) {
    throw new AppError(`Todo "${format(todo)}" is already done.`);
  }
  todo.done = true;
  todoStore.set(todos)
  return todo;
}

export function updateTitle(todoStore, params){
  const [id, title] = params;
  const todos = list(todoStore);
  const todo = findById(todos, id);
  todo.title = title;
  todoStore.set(todos);
  return todo;
}

export function deleteTodo(todoStore, id){
  let todos = todoStore.get();
  let todo = findById(todos, id);
  todos.splice(todos.indexOf(todo), 1);
  todoStore.set(todos);
  return todo;
}