import { beforeEach, afterEach, beforeAll } from "vitest";
import { renderApp } from "../main";

beforeAll(() => {
  document.body.innerHTML = "<todo-list></todo-list>";
  renderApp();
});

afterEach(() => {
  document.body.innerHTML = "";
});
