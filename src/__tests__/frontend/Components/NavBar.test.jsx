import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../../../Components/Navbar";

describe("Navbar Tests", () => {
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
          <NavBar></NavBar>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
