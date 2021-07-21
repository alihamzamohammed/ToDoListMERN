import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { enableFetchMocks } from "jest-fetch-mock";
import { MemoryRouter as Router, Route } from "react-router-dom";
import TodoForm from "../../../../Components/Todo/TodoForm";

enableFetchMocks();

describe("Category Form Tests", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    fetch.resetMocks();
  });

  it("Renders the Edit Todo Form", async () => {
    const testTodo = {
      title: "Test Title",
      content: "Test Content",
      category: { _id: "123" },
      _id: "123",
      dateAdded: "2021-07-06T14:20:56.175Z",
    };

    const testCats = [
      {
        name: "Test Category",
        _id: "123",
        dateAdded: "2021-07-06T14:20:56.175Z",
      },
    ];

    fetch
      .mockResponseOnce(JSON.stringify(testCats))
      .mockResponseOnce(JSON.stringify(testTodo));

    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
      useParams: () => ({
        paramId: "123",
      }),
    }));

    await act(async () => {
      render(
        <Router initialEntries={["/edit/todo/123"]}>
          <Route path="/edit/todo/:paramId">
            <TodoForm></TodoForm>
          </Route>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("Renders the Create Todo Form", async () => {
    const testCats = [
      {
        name: "Test Category",
        _id: "123",
        dateAdded: "2021-07-06T14:20:56.175Z",
      },
    ];

    fetch.mockResponse(JSON.stringify(testCats));

    await act(async () => {
      render(
        <Router>
          <TodoForm></TodoForm>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
