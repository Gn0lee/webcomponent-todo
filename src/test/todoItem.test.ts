import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { page } from "@vitest/browser/context";

describe("Test Todo Item", () => {
  it("should render todo item", async () => {
    const addTodoItemButton = page.getByText("+");

    expect(addTodoItemButton).not.toBeNull();

    await addTodoItemButton.click();

    const todoItem = page.getByText("Task 1");

    expect(todoItem).not.toBeNull();
  });

  it("should strike through task on checkbox checked", async () => {
    const checkbox = page.getByAltText("checkbox");

    expect(checkbox).not.toBeNull();

    await checkbox.click();

    const todoItem = page.getByText("Task 1").element();

    expect(todoItem).toHaveClass("strike-through");

    await checkbox.click();

    expect(todoItem).not.toHaveClass("strike-through");
  });

  it("should remove todo item on delete button click", async () => {
    const deleteButton = page.getByText("x");

    expect(deleteButton).not.toBeNull();

    await deleteButton.click();

    const todoItem = page.getByText("Task 1");

    expect(todoItem).toBeNull();
  });
});
