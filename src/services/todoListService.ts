import { TodoService } from "./todoService";

class TodoListService {
  #todoList: TodoService[] = [];

  constructor(todoList: TodoService[]) {
    this.#todoList = todoList;
  }

  getTodoList() {
    return [...this.#todoList];
  }

  addNewTodo() {
    const newTodoService = new TodoService(
      this.#todoList.length + 1,
      `Task ${this.#todoList.length + 1}`
    );

    this.#todoList = [...this.#todoList, newTodoService];

    return newTodoService;
  }

  deleteTodoItem(targetId: TodoService["id"]) {
    this.#todoList = this.#todoList.filter((todo) => todo.id !== targetId);
  }
}

const todoListService = new TodoListService([]);

export default todoListService;
