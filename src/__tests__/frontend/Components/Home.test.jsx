import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { enableFetchMocks } from "jest-fetch-mock";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../../Components/Home";

enableFetchMocks();

describe("Home page tests", () => {
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

  it("Renders category with todos", async () => {
    const testCats = [
      {
        name: "Test Category",
        _id: "123",
      },
    ];

    const testTodos = [
      { _id: "321", title: "test todo", content: "test todo contents" },
    ];

    fetch
      .mockResponseOnce(JSON.stringify(testCats))
      .mockResponseOnce(JSON.stringify(testTodos));

    await act(async () => {
      render(
        <Router>
          <App></App>
        </Router>,
        container
      );
    });

    expect(container).toMatchSnapshot();
  });

  it("Renders only category", async () => {
    const testCats = [
      {
        name: "Test Category",
        _id: "123",
      },
    ];

    fetch
      .mockResponseOnce(JSON.stringify(testCats))
      .mockResponseOnce(JSON.stringify([]));

    await act(async () => {
      render(
        <Router>
          <App></App>
        </Router>,
        container
      );
    });

    expect(container).toMatchSnapshot();
  });

  it("Before rendering", () => {
    act(() => {
      render(
        <Router>
          <App></App>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
