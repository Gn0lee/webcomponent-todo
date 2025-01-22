import { describe, expect, it } from "vitest";
import { page } from "@vitest/browser/context";

describe("Test Todo Item", () => {
  it("should render todo item", async () => {
    const addTodoItemButton = page.getByText("+");

    expect(addTodoItemButton.query()).not.toBeNull();

    await addTodoItemButton.click();

    const todoItem = page.getByText("Task 1");

    expect(todoItem).not.toBeNull();
  });

  it("should strike through task on checkbox checked", async () => {
    const checkbox = page.getByAltText("checkbox");

    expect(checkbox.query()).not.toBeNull();

    await checkbox.click();

    const todoItem = page.getByText("Task 1").element();

    expect(todoItem).toHaveClass("strike-through");

    await checkbox.click();

    expect(todoItem).not.toHaveClass("strike-through");
  });

  it("should remove todo item on delete button click", async () => {
    const deleteButton = page.getByText("✕");

    expect(deleteButton.query()).not.toBeNull();

    await deleteButton.click();

    const todoItem = page.getByText("Task 1");

    expect(todoItem.query()).toBeNull();
  });
});

describe("Test Edit Todo Item", () => {
  it("should render task input on task display click", async () => {
    const addTodoItemButton = page.getByText("+");

    expect(addTodoItemButton.query()).not.toBeNull();

    await addTodoItemButton.click();

    const todoItem = page.getByText("Task 1");

    await todoItem.click();

    const taskInput = page.getByAltText("task-input");

    expect(taskInput.query()).toBeVisible();
  });

  it("should update task on task input blur", async () => {
    const taskInput = page.getByAltText("task-input");

    await taskInput.fill("New Task");

    // click outside of the input to blur
    const header = page.getByText("Todo List");

    await header.click();

    const updatedTodoItem = page.getByText("New Task");

    expect(updatedTodoItem.query()).not.toBeNull();
  });
});
