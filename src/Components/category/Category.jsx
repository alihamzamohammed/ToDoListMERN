import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Todo from '../todo/Todo';

const Category = (props) => {
    return (
        <Container>
            <div className="category">
                <Row>
                    <Col xs="1" className="category-id">
                        <h4>{props.id}</h4>
                    </Col>
                    <Col xs="11" className="category-name">
                        <h3>{props.name}</h3>
                    </Col>
                </Row>
                <Row>
                    {props.todos.map((todo, idx) => (
                        <Todo title={todo.title} content={todo.content} id={todo.id} key={idx} />
                    ))}
                </Row>
            </div>
        </Container>
    )
};

export default Category;