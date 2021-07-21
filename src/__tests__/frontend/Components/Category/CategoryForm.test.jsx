import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "whatwg-fetch";

import { MemoryRouter as Router, Route } from "react-router-dom";
import CategoryForm from "../../../../Components/Category/CategoryForm";

describe("Category Form Tests", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.resetAllMocks();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("Renders the Edit Category Form with ID 0", () => {
    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"), // use actual for all non-hook parts
      useParams: () => ({
        paramId: "0",
      }),
    }));

    act(() => {
      render(
        <Router initialEntries={["/edit/category/0"]}>
          <Route path="/edit/category/:paramId">
            <CategoryForm></CategoryForm>
          </Route>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("Renders the Edit Category Form", async () => {
    const testCat = {
      name: "Test Category",
      _id: "123",
      dateAdded: "2021-07-06T14:20:56.175Z",
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testCat),
      })
    );

    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"), // use actual for all non-hook parts
      useParams: () => ({
        paramId: "123",
      }),
    }));

    await act(async () => {
      render(
        <Router initialEntries={["/edit/category/123"]}>
          <Route path="/edit/category/:paramId">
            <CategoryForm></CategoryForm>
          </Route>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("Renders the Create Category Form", () => {
    act(() => {
      render(
        <Router location="/create/category">
          <CategoryForm></CategoryForm>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
