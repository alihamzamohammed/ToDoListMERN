import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/Navbar';



ReactDOM.render(
  <React.StrictMode>
    <Container fluid>
    <Router>
      
        <NavBar />
      
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/create/todo" component={App} />
        <Route path="/create/category" component={App} />
      </Switch>
    </Router>
      </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
