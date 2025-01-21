import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { page } from "@vitest/browser/context";

describe("Test Todo List", () => {
  it("should render header of todo list", () => {
    const header = page.getByText("Todo List");

    expect(header).not.toBeNull();
  });

  it("should render add todo item button", () => {
    const addTodoItemButton = page.getByText("+");

    expect(addTodoItemButton).not.toBeNull();
  });
});
