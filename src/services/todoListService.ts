import { Todo } from "../model/todo";

class TodoListService {
  #todoList: Todo[] = [];

  constructor(todoList: Todo[]) {
    this.#todoList = todoList;
  }

  getTodoList() {
    return [...this.#todoList];
  }

  addNewTodo() {
    const newTodo: Todo = {
      id: this.#todoList.length + 1,
      complete: false,
      task: `Task ${this.#todoList.length + 1}`,
    };

    this.#todoList = [...this.#todoList, newTodo];

    return newTodo;
  }

  updateTodoItem(targetTodo: Todo) {
    this.#todoList = this.#todoList.map((todo) =>
      todo.id === targetTodo.id ? targetTodo : todo
    );

    return { ...targetTodo };
  }

  deleteTodoItem(targetId: Todo["id"]) {
    this.#todoList = this.#todoList.filter((todo) => todo.id !== targetId);
  }

  toggleTodoItemComplete(targetId: Todo["id"]) {
    const targetTodo = this.#todoList.find((todo) => todo.id === targetId);

    if (!targetTodo) return;

    this.#todoList = this.#todoList.map((todo) =>
      todo.id === targetTodo.id
        ? { ...targetTodo, complete: !targetTodo.complete }
        : todo
    );

    return { ...targetTodo, complete: !targetTodo.complete };
  }
}

const todoListService = new TodoListService([]);

export default todoListService;
