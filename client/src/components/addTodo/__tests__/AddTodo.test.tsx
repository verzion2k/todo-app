import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddTodo } from "../AddTodo";

const mockCreateTodo = jest.fn();
jest.mock("../../../store/api/todos", () => ({
  useCreateTodoMutation: () => [mockCreateTodo],
}));

describe("<AddTodo />", () => {
  beforeEach(() => {
    mockCreateTodo.mockClear();
  });

  it("renders an empty TextField initially", () => {
    render(<AddTodo />);
    const input = screen.getByRole("textbox", { name: /new todo/i });
    expect(input).toHaveValue("");
  });

  it("updates the input value onChange", () => {
    render(<AddTodo />);
    const input = screen.getByRole("textbox", { name: /new todo/i });
    fireEvent.change(input, { target: { value: "Prepare for interview" } });
    expect(input).toHaveValue("Prepare for interview");
  });

  it("calls createTodo and clears input on Enter key", () => {
    render(<AddTodo />);
    const input = screen.getByRole("textbox", { name: /new todo/i });

    fireEvent.change(input, { target: { value: "Do laundry" } });
    expect(input).toHaveValue("Do laundry");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(mockCreateTodo).toHaveBeenCalledWith({ text: "Do laundry" });

    expect(input).toHaveValue("");
  });

  it("does not call createTodo on other keys", () => {
    render(<AddTodo />);
    const input = screen.getByRole("textbox", { name: /new todo/i });

    fireEvent.change(input, { target: { value: "Test key" } });
    fireEvent.keyDown(input, { key: "a", code: "KeyA" });

    expect(mockCreateTodo).not.toHaveBeenCalled();
    expect(input).toHaveValue("Test key");
  });
});
