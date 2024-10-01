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

export function complete(todoStore, todoId) {
  const todos = todoStore.get();
  const todo = todos.find((todo) => todo.id == todoId);
  
  if (todoId > todos.length){
      throw new AppError(`out of bound, you have ${todos.length} todos.`);
  }
  if (!todo) {
      throw new AppError(`Todo with ID ${todoId} not found.`);
  }
  if(todo.done){
      throw new AppError(`Todo "${format(todo)}" is already done.`);
  }
  todo.done = true;
  todoStore.set(todos)
  return todo;
}