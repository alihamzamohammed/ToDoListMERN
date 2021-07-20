import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter as Router } from "react-router-dom";
import App from "../../../Components/Home";

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
  });

  it("Renders category with todos", async () => {
    const testCats = [
      {
        name: "Test Category",
        _id: "123",
        todos: [{ title: "test todo", contents: "test todo contents" }],
      },
    ];

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testCats),
      })
    );

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

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testCats),
      })
    );

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
