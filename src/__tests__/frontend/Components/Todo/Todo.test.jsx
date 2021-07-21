import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter as Router } from "react-router-dom";
import Todo from "../../../../Components/Todo/Todo";

describe("Todo Card Tests", () => {
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

  it("Renders the navbar", () => {
    act(() => {
      render(
        <Router>
          <Todo title="Test Title" content="Test Content" id="1234"></Todo>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
