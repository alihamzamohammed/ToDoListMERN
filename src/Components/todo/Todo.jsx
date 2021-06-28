import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Todo = (props) => {
    return (
        <Col className="todo-container">
            <Link to={"/edit/todo/" + props.id} className="link-text">

                <Card className="todo-item">
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>{props.content}</Card.Text>
                        <Card.Subtitle className="text-muted todo-id">{props.id}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Link>

        </Col>
    )
};

export default Todo;