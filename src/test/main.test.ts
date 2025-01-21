import { describe, expect, it } from "vitest";
import { page } from "@vitest/browser/context";

describe("Test Todo List", () => {
  it("should render header of todo list", () => {
    const header = page.getByText("Todo List");

    expect(header).not.toBeNull();
  });
});
