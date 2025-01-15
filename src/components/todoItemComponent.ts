import { Todo } from "../model/todo";
import todoListService from "../services/todoListService";

const todoItemTemplate = document.createElement("template");
todoItemTemplate.innerHTML = `
    <style>
        @import url('./src/components/todoItemComponent.css')
    </style>
    <div class="todo-item">
        <input class="todo-check" type="checkbox"/>
        <div class="todo-task">
            <input class="task-input" hidden type="text"/>
            <span class="task-display"></span>
        </div>
        <div class="spacer"></div>
        <button class="delete-todo-item-btn">✕</button>
    </div>
`;

export class TodoItemComponent extends HTMLElement {
  isEditingTodo: boolean;
  mouseDownEl: HTMLElement | null;
  todoItem: HTMLDivElement;
  todoCheck: HTMLInputElement;
  taskInput: HTMLInputElement;
  taskDisplay: HTMLSpanElement;
  deleteTodoItemBtn: HTMLButtonElement;
  todo: Todo;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(todoItemTemplate.content.cloneNode(true));

    this.isEditingTodo = false;
    this.mouseDownEl = null;

    this.todoItem = this.shadowRoot?.querySelector(
      ".todo-item"
    ) as HTMLDivElement;

    this.todoCheck = this.shadowRoot?.querySelector(
      ".todo-check"
    ) as HTMLInputElement;
    this.taskInput = this.shadowRoot?.querySelector(
      ".content-input"
    ) as HTMLInputElement;
    this.taskDisplay = this.shadowRoot?.querySelector(
      ".content-display"
    ) as HTMLSpanElement;
    this.deleteTodoItemBtn = this.shadowRoot?.querySelector(
      ".delete-todo-item-btn"
    ) as HTMLButtonElement;

    this.todo = todoListService.addNewTodo();
  }

  connectedCallback() {
    this.taskInput.value = this.todo.task;
    this.taskDisplay.innerHTML = this.todo.task;

    this.taskDisplay.addEventListener("click", (event) => {
      event.preventDefault();

      this.turnToEditMode();
    });

    this.todoItem.addEventListener("mousedown", (event) => {
      event.preventDefault();

      this.mouseDownEl = event.target as HTMLElement;
    });

    document.addEventListener("mousedown", (event) => {
      event.preventDefault();

      if (this.isClickOutside()) {
        this.saveTodo();
      }

      this.mouseDownEl = null;
    });

    this.deleteTodoItemBtn.addEventListener("click", (event) => {
      event.preventDefault();

      this.deleteTodo();
    });

    this.todoCheck.addEventListener("change", (event) => {
      event.preventDefault();

      this.toggleComplete();
    });
  }

  disconnectedCallback() {
    this.taskDisplay.removeEventListener("click", (event) => {
      event.preventDefault();

      this.turnToEditMode();
    });

    this.todoItem.removeEventListener("mousedown", (event) => {
      event.preventDefault();

      this.mouseDownEl = event.target as HTMLElement;
    });

    document.removeEventListener("mousedown", (event) => {
      event.preventDefault();

      if (this.isEditingTodo && this.isClickOutside()) {
        this.saveTodo();
      }
    });

    this.deleteTodoItemBtn.removeEventListener("click", (event) => {
      event.preventDefault();

      this.deleteTodo();
    });

    this.todoCheck.removeEventListener("change", (event) => {
      event.preventDefault();

      this.toggleComplete();
    });
  }

  isClickOutside() {
    return (
      !this.mouseDownEl ||
      (this.mouseDownEl && !this.mouseDownEl.matches(".todo-item"))
    );
  }

  turnToEditMode() {
    if (!this.todoCheck.checked) {
      this.isEditingTodo = true;

      this.taskInput.hidden = false;
      this.taskDisplay.hidden = true;

      this.taskInput.focus();
    }
  }

  saveTodo() {
    this.todo = todoListService.updateTodoItem({
      ...this.todo,
      task: this.taskInput.value,
    });

    this.isEditingTodo = false;

    this.taskInput.hidden = true;
    this.taskDisplay.hidden = false;

    this.taskDisplay.innerHTML = this.todo.task;
  }

  deleteTodo() {
    todoListService.deleteTodoItem(this.todo.id);

    this.remove();
  }

  toggleComplete() {
    const newTodo = todoListService.toggleTodoItemComplete(this.todo.id);

    if (newTodo) {
      this.todo = newTodo;
      this.todoCheck.checked = newTodo.complete;

      if (newTodo.complete) {
        this.taskDisplay.classList.add("strike-through");
      } else {
        this.taskDisplay.classList.remove("strike-through");
      }
    }
  }
}
