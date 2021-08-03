import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { enableFetchMocks } from "jest-fetch-mock";
import { MemoryRouter as Router, Route } from "react-router-dom";
import CategoryForm from "../../../../Components/Category/CategoryForm";

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

  it("Renders the Edit Category Form with ID 0", () => {
    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
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
      _id: "60e466c86acde2a0a470895d",
      name: "testing",
      dateAdded: "2021-07-06T14:20:56.175Z",
    };

    fetch.mockResponse(JSON.stringify(testCat));

    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
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
        <Router>
          <CategoryForm></CategoryForm>
        </Router>,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
