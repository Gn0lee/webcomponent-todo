import { TodoItemComponent } from "../components/todoItemComponent";
import { TodoListComponent } from "../components/todoListComponent";

const ComponentEntries: Record<string, CustomElementConstructor> = {
  "todo-item": TodoItemComponent,
  "todo-list": TodoListComponent,
};

const defineComponent = (
  name: string,
  constructor: CustomElementConstructor
) => {
  window.customElements.define(name, constructor);
};

const defineAllComponents = () => {
  Object.entries(ComponentEntries).forEach(([name, constructor]) => {
    defineComponent(name, constructor);
  });
};

const createNewComponent = (name: keyof typeof ComponentEntries) => {
  return document.createElement(name);
}

export { defineAllComponents, createNewComponent };
