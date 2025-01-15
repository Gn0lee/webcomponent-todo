import { Todo } from "../model/todo";

export class TodoListService {
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
  }

  updateTodoItem(targetTodo: Todo) {
    this.#todoList = this.#todoList.map((todo) =>
      todo.id === targetTodo.id ? targetTodo : todo
    );
  }

  deleteTodoItem(targetId: Todo["id"]) {
    this.#todoList = this.#todoList.filter((todo) => todo.id !== targetId);
  }

  toggleTodoItemComplete(targetId: Todo["id"]) {
    this.#todoList = this.#todoList.map((todo) =>
      todo.id === targetId ? { ...todo, complete: !todo.complete } : todo
    );
  }
}
