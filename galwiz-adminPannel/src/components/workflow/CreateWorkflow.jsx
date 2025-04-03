import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const CreateWorkflow = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/v1/main/create/workflow", {
                title,
                link
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='m-0 ms-lg-5'>
            <h1 className='pt-5 mt-5'>Create Workflow</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>WorkFlow Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter text" onChange={(e) => { setTitle(e.target.value) }} />
                    <Form.Text className="text-muted">
                        Please enter the name of workflow which you want to create.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Form.Label>WorkFlow Link</Form.Label>
                    <Form.Control type="link" placeholder="Link" onChange={(e) => { setLink(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateWorkflow
