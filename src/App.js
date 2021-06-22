import './App.css';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Category from './Components/category/Category';

function App() {

  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);

  // const getTodos = async () => {

  // };

  const getCategories = async () => {
    var response = await fetch("http://localhost:5050/category/read");
    var returnedCategories = await response.json();
    setCategories(returnedCategories);
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <>
      <div className="body">
        {
          Array.isArray(categories) && Array.isArray(todos) && categories.length > 0 ?
            categories.forEach(cat => {
              <Category id={cat.id} name={cat.name} todos={cat.todos} />
            })
          :
            <>
              <div className="spinner">
              <Spinner animation="border" className="spinner-border" />
                <p>Loading...</p>
                </div>
            </>
        }
      </div>
    </>
  );
}

export default App;
