import React, { useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const CategoryForm = () => {

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [response, setResponse] = useState("");
    //var edit = location.includes("edit");

    const createCategory = async () => {
        await fetch(`http://localhost:5050/category/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title
            })
        });
        setResponse("Category was created successfully!");
    };

    return (
        (typeof id === "undefined" || id === null) ?
            <>
                <Form className="text-input">
                    <div className="mb-3">
                        <Form.Group>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" value={title} onChange={event => setTitle(event.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="mb-3 gx-5">
                        <Button variant="success" onClick={() => createCategory()} className="form-button">Create</Button>
                        <Button variant="primary" onClick={() => setTitle("")} className="form-button">Reset</Button>
                        <Button variant="warning" onClick={() => history.push("/")} className="form-button">Discard</Button>
                    </div>
                </Form>
                <div>
                    <p className="response">{response}</p>
                </div>
            </>
            :
            <>

            </>

    )
};

export default CategoryForm;