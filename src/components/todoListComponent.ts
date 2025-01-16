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

export class TodoListComponent extends HTMLElement {
  todoListContainer: HTMLDivElement;
  todoItems: HTMLDivElement;
  addTodoItemButton: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(todoListTemplate.content.cloneNode(true));

    this.todoListContainer = this.shadowRoot?.querySelector(
      ".todo-list-container"
    ) as HTMLDivElement;
    this.todoItems = this.shadowRoot?.querySelector(
      ".todo-items"
    ) as HTMLDivElement;
    this.addTodoItemButton = this.shadowRoot?.querySelector(
      ".add-todo-item-btn"
    ) as HTMLButtonElement;
  }

  connectedCallback() {
    this.addTodoItemButton.addEventListener("click", () => {
      const newTodoItem = document.createElement("todo-item");
      this.todoItems.appendChild(newTodoItem);
    });
  }

  disconnectedCallback() {
    this.addTodoItemButton.removeEventListener("click", () => {
      const newTodoItem = document.createElement("todo-item");
      this.todoItems.appendChild(newTodoItem);
    });
  }
}
