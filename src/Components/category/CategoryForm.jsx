import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';

const CategoryForm = () => {

    const { paramId } = useParams();
    const [id, setId] = useState();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [response, setResponse] = useState("");
    const [disabled, setDisabled] = useState(false);

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

    const updateCategory = async () => {
        await fetch(`http://localhost:5050/category/update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title
            })
        });
        setResponse("Category was updated successfully!");
    };

    const deleteCategory = async () => {
        await fetch(`http://localhost:5050/category/delete/${id}`, {
            method: "DELETE"
        });
        setResponse("Category was deleted successfully!");
        setDisabled(true);
    };

    const create = (typeof paramId === "undefined" || paramId === null);

    useEffect(() => {
        async function readCategory() {
            const read = await fetch(`http://localhost:5050/category/read/${id}`);
            const json = await read.json()
            setTitle(json.name)
        }
        setId(paramId);
        if (!create) {
            readCategory()
        }
    }, [create, id, paramId])


    return (
        id === "0" ? <Row className="justify-content-md-center"><p className="">This category cannot be edited</p></Row> :
            create ?
                <>
                    <h1 className="display-3 title">Create Category:</h1>
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
                    <h1 className="display-3 title">Edit Category:</h1>
                    <Form className="text-input">
                        <div className="mb-3">
                            <p className="text-muted">ID: {id}</p>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="title" value={title} onChange={event => setTitle(event.target.value)} disabled={disabled}></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-3 gx-5">
                            <Button variant="success" onClick={() => updateCategory()} className="form-button" disabled={disabled}>Update</Button>
                            <Button variant="primary" onClick={() => setTitle("")} className="form-button" disabled={disabled}>Reset</Button>
                            <Button variant="warning" onClick={() => history.push("/")} className="form-button" disabled={disabled}>Discard</Button>
                            <Button variant="danger" onClick={() => deleteCategory()} className="form-button" disabled={disabled}>Delete</Button>
                        </div>
                    </Form>
                    <div>
                        <p className="response">{response}</p>
                    </div>
                </>
    )
}

export default CategoryForm;