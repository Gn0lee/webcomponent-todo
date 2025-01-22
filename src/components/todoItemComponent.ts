import { Todo } from "../model/todo";
import todoListService from "../services/todoListService";

const todoItemTemplate = document.createElement("template");
todoItemTemplate.innerHTML = `
    <style>
        @import url('/components/todoItemComponent.css')
    </style>
    <div class="todo-item">
        <input class="todo-check" type="checkbox" alt="checkbox"/>
        <div class="todo-task">
            <input class="task-input" hidden type="text" alt="task-input"/>
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

  private taskDisplayClickHandler = this.turnToEditMode.bind(this);

  private todoItemClickHandler = this.setMouseDownEl.bind(this);

  private documentMouseDownHandler = this.handleClickDocument.bind(this);

  private deleteTodoItemHandler = this.deleteTodo.bind(this);

  private todoCheckChangeHandler = this.toggleComplete.bind(this);

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
      ".task-input"
    ) as HTMLInputElement;
    this.taskDisplay = this.shadowRoot?.querySelector(
      ".task-display"
    ) as HTMLSpanElement;
    this.deleteTodoItemBtn = this.shadowRoot?.querySelector(
      ".delete-todo-item-btn"
    ) as HTMLButtonElement;

    this.todo = todoListService.addNewTodo();
  }

  connectedCallback() {
    this.taskInput.value = this.todo.task;
    this.taskDisplay.innerHTML = this.todo.task;

    this.taskDisplay.addEventListener("click", this.taskDisplayClickHandler);

    this.todoItem.addEventListener("mousedown", this.todoItemClickHandler);

    document.addEventListener("mousedown", this.documentMouseDownHandler);

    this.deleteTodoItemBtn.addEventListener(
      "click",
      this.deleteTodoItemHandler
    );

    this.todoCheck.addEventListener("change", this.todoCheckChangeHandler);
  }

  disconnectedCallback() {
    this.taskDisplay.removeEventListener("click", this.taskDisplayClickHandler);

    this.todoItem.removeEventListener("mousedown", this.todoItemClickHandler);

    document.removeEventListener("mousedown", this.documentMouseDownHandler);

    this.deleteTodoItemBtn.removeEventListener(
      "click",
      this.deleteTodoItemHandler
    );

    this.todoCheck.removeEventListener("change", this.todoCheckChangeHandler);
  }

  isClickOutside() {
    return (
      !this.mouseDownEl ||
      (this.mouseDownEl && !this.mouseDownEl.matches(".todo-item"))
    );
  }

  turnToEditMode(event: MouseEvent) {
    event.preventDefault();
    if (!this.todoCheck.checked) {
      this.isEditingTodo = true;

      this.taskInput.hidden = false;
      this.taskDisplay.hidden = true;

      this.taskInput.focus();
    }
  }

  setMouseDownEl(event: MouseEvent) {
    event.preventDefault();
    this.mouseDownEl = event.target as HTMLElement;
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

  deleteTodo(event: MouseEvent) {
    event.preventDefault();
    todoListService.deleteTodoItem(this.todo.id);

    this.remove();
  }

  toggleComplete(event: Event) {
    event.preventDefault();

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

  handleClickDocument(event: MouseEvent) {
    event.preventDefault();

    if (this.isEditingTodo && this.isClickOutside()) {
      this.saveTodo();
    }

    this.mouseDownEl = null;
  }
}
