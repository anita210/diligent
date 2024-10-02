export function format(todo) {
   const labels = todo.labels && todo.labels.length > 0 ? todo.labels.join(', ') : '';
  
  return `${todo.id} - [${todo.done ? 'x': ' '}] (${labels}) ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format);
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

 Show-labels
export function addLabel(store, id, label) {
  const todos = store.get();
  const todo = findById(todos, id);

  if (!todo.labels) {
    todo.labels = [];
  }

  if (!todo.labels.includes(label)) {
    todo.labels.push(label);
  }

  store.set(todos);
  return todo;
}

export function findByTitle(todos, title) {
  const titleTodos = todos.filter((todo) => todo.title.toLowerCase() === title.toLowerCase());
  return titleTodos;
 main
}

export function deleteLabel(store, id, label) {
  const todos = store.get();
  const todo = findById(todos, id);

  if (!todo) {
    console.error("Error: Todo not found.");
    return;
  }

  if (!todo.labels) {
    console.log(`Label "${label}" not found in todo with ID ${id}.`);
    return;
  }

  const labelIndex = todo.labels.indexOf(label);
  
  if (labelIndex > -1) {
    todo.labels.splice(labelIndex, 1);
    console.log(`Label "${label}" removed from todo with ID ${id}.`);
  } else {
    console.log(`Label "${label}" not found in todo with ID ${id}.`);
  }
  store.set(todos);
  return todo;
}

