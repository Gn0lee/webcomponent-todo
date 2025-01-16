import { TodoItemComponent } from "./components/todoItemComponent";
import { TodoListComponent } from "./components/todoListComponent";
import "./style.css";

window.customElements.define("todo-item", TodoItemComponent);
window.customElements.define("todo-list", TodoListComponent);
