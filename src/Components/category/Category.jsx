import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Todo from '../todo/Todo';

const Category = (props) => {
    return (
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
                    <Todo title={todo.title} content={todo.content} id={todo.id} key={idx} />
                ))}
            </Row>
        </div>
    )
};

export default Category;