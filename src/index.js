import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/Home";
import reportWebVitals from "./reportWebVitals";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import CategoryForm from "./Components/category/CategoryForm";
import TodoForm from "./Components/todo/TodoForm";

ReactDOM.render(
  <React.StrictMode>
    <Container fluid>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create/todo" component={TodoForm} />
          <Route path="/create/category" component={CategoryForm} />
          <Route path="/edit/todo/:paramId" component={TodoForm} />
          <Route path="/edit/category/:paramId" component={CategoryForm} />
        </Switch>
      </Router>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
