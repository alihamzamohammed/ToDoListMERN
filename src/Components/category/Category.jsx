import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Todo from '../todo/Todo';

const Category = (props) => {
    return (
        <Link to={"/edit/category/" + props.id} className="link-text">
            <div className="category">
                <Row>
                    <Col xmd="1" className="category-id">
                        <h4>{props.id}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="category-name">
                        <h3>{props.name}</h3>
                    </Col>
                </Row>
                <Row>
                    {props.todos.map((todo, idx) => (
                        <Todo title={todo.title} content={todo.content} id={todo._id} key={idx} />
                    ))}
                </Row>
            </div>
        </Link >
    )
};

export default Category;