import React from 'react';
import { Col, Card } from 'react-bootstrap';

const Todo = (props) => {
    return (
        <Col className="todo-container">
            <Card className="todo-item">
                <Card.Body>
                    <Card.Title>props.title</Card.Title>
                    <Card.Text>props.content</Card.Text>
                    <Card.Subtitle className="text-muted todo-id">props.id</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    )
};

export default Todo;