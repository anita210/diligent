import { AppError } from "./app-error.js";
import { display } from "./display.js";
import { format } from "./todo.js";

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
    display([`Todo marked as complete:`]);
    display([format(todo)])
    return todoStore.get();
}
