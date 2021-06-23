import "./App.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Category from "./Components/category/Category";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);

  const getTodos = async () => {
    const response = await fetch("http://localhost:5050/todo/read");
    const returnedTodos = await response.json();
    setTodos(returnedTodos);
  };

  const getCategories = async () => {
    const response = await fetch("http://localhost:5050/category/read");
    const returnedCategories = await response.json();
    returnedCategories.unshift({
      _id: 0,
      name: "Unsorted Todos",
      todos: [],
    });
    setCategories(returnedCategories);
  };

  useEffect(() => {
    getCategories();
    getTodos();
  }, []);

  return (
    <>
      <div className="body">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat, idx) => {
            let catTodos;
            if (cat._id === 0) {
              catTodos = todos.filter(
                (todo) => !todo.hasOwnProperty("category")
              );
            } else {
              catTodos = todos.filter((todo) =>
                todo.hasOwnProperty("category")
                  ? todo.category._id === cat._id
                  : false
              );
            }
            console.log(catTodos);
            return (
              <Category
                id={cat._id}
                name={cat.name}
                todos={catTodos}
                key={idx}
              />
            );
          })
        ) : (
          <div className="spinner">
            <Spinner animation="border" className="spinner-border" />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
