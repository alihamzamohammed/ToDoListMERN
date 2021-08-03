import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const TodoForm = () => {
  const { paramId } = useParams();
  const [id, setId] = useState();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [possibleCategories, setPossibleCategories] = useState([]);
  const [response, setResponse] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [dateAdded, setDateAdded] = useState("");

  const createTodo = async () => {
    let send = await fetch(`http://localhost:5050/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category:
          selectedCategory !== "0" ? String(selectedCategory) : undefined,
      }),
    });
    let json = await send.json();
    setResponse(`Todo was created successfully! ID: ${json._id}`);
  };

  const updateTodo = async () => {
    await fetch(`http://localhost:5050/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category:
          selectedCategory !== "0" ? String(selectedCategory) : undefined,
      }),
    });
    setResponse("Todo was updated successfully!");
  };

  const deleteTodo = async () => {
    await fetch(`http://localhost:5050/todo/delete/${id}`, {
      method: "DELETE",
    });
    setResponse("Todo was deleted successfully!");
    setDisabled(true);
  };

  const create = typeof paramId === "undefined" || paramId === null;

  useEffect(() => {
    const readTodo = async () => {
      try {
        const read = await fetch(`http://localhost:5050/todo/read/${id}`);
        const json = await read.json();
        setTitle(json.title);
        setContent(json.content);
        setDateAdded(json.dateAdded);
        if (json.hasOwnProperty("category")) {
          setSelectedCategory(json.category._id);
        } else {
          setSelectedCategory("0");
        }
      } catch (err) {
        console.error(err);
      }
    };
    const readCategories = async () => {
      try {
        const read = await fetch(`http://localhost:5050/category/read`);
        const json = await read.json();
        setPossibleCategories(json);
      } catch (err) {
        console.error(err);
      }
    };
    setId(paramId);
    readCategories();
    if (!create) {
      readTodo();
    } else {
      setSelectedCategory("0");
    }
  }, [create, id, paramId]);

  return create ? (
    <>
      <h1 className="display-3 title">Create Todo:</h1>
      <Form className="text-input">
        <div className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="content">Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="categorySelect">Category</Form.Label>
            <Form.Control
              as="select"
              name="possibleCategories"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value={0}>Unsorted Todos</option>
              {possibleCategories.map((cat, idx) => (
                <option value={cat._id} key={idx}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="mb-3 gx-5">
          <Button
            variant="success"
            onClick={() => createTodo()}
            className="form-button"
          >
            Create
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setTitle("");
              setContent("");
            }}
            className="form-button"
          >
            Reset
          </Button>
          <Button
            variant="warning"
            onClick={() => history.push("/")}
            className="form-button"
          >
            Discard
          </Button>
        </div>
      </Form>
      <div>
        <p className="response">{response}</p>
      </div>
    </>
  ) : (
    <>
      <h1 className="display-3 title">Edit Todo:</h1>
      <Form className="text-input">
        <div className="mb-3">
          <p className="text-muted">ID: {id}</p>
          <p className="text-muted">
            Date Added: {new Date(dateAdded).toUTCString()}
          </p>
        </div>
        <div className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={disabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="content">Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              disabled={disabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="categorySelect">Category</Form.Label>
            <Form.Control
              as="select"
              name="possibleCategories"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              disabled={disabled}
            >
              <option value={0}>Unsorted Todos</option>
              {possibleCategories.map((cat, idx) => (
                <option value={cat._id} key={idx}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="mb-3 gx-5">
          <Button
            variant="success"
            onClick={() => updateTodo()}
            className="form-button"
            disabled={disabled}
          >
            Update
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setTitle("");
              setContent("");
            }}
            className="form-button"
            disabled={disabled}
          >
            Reset
          </Button>
          <Button
            variant="warning"
            onClick={() => history.push("/")}
            className="form-button"
            disabled={disabled}
          >
            Discard
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteTodo()}
            className="form-button"
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
      </Form>
      <div>
        <p className="response">{response}</p>
      </div>
    </>
  );
};

export default TodoForm;
