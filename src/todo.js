
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
  const paramStatus = status[0] === 'done' ? true : (status[0] === 'not-done' ? false : status[0]);
  const statusTodos = todos.filter((todo) => todo.done === paramStatus );
  return statusTodos;
}