import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter as Router } from "react-router-dom";
import Category from "../../../../Components/Category/Category";

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
          <Category name="Test Name" id="1234" todos={[]}></Category>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
    expect(container.querySelector(".category-name").textContent).toBe(
      "Test Name"
    );
    expect(container.querySelector(".category-id").textContent).toBe("1234");
  });
});
