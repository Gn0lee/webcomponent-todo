import { BaseComponent } from "./baseComponent";

const todoListTemplate = document.createElement("template");
todoListTemplate.innerHTML = `
    <style>
      @import url('/components/todoListComponent.css');
    </style>
    <div class="app-component">
        <div class="todo-list-container">
            <h1>Todo List</h1>
            <div class="todo-items">
            </div>
            <button class="add-todo-item-btn">+</button>
        </div>
    </div>
`;

export class TodoListComponent extends BaseComponent {
  todoListContainer: HTMLDivElement;
  todoItems: HTMLDivElement;
  addTodoItemButton: HTMLButtonElement;

  private addTodoItemHandler = this.addTodoItem.bind(this);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(todoListTemplate.content.cloneNode(true));

    this.todoListContainer = this.getShadowElementOrThrow<HTMLDivElement>(
      ".todo-list-container"
    );

    this.todoItems =
      this.getShadowElementOrThrow<HTMLDivElement>(".todo-items");

    this.addTodoItemButton =
      this.getShadowElementOrThrow<HTMLButtonElement>(".add-todo-item-btn");
  }

  private addTodoItem() {
    const newTodoItem = document.createElement("todo-item");
    this.todoItems.appendChild(newTodoItem);
  }

  connectedCallback() {
    this.addTodoItemButton.addEventListener("click", this.addTodoItemHandler);
  }

  disconnectedCallback() {
    this.addTodoItemButton.removeEventListener(
      "click",
      this.addTodoItemHandler
    );
  }
}
