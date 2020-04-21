import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddSampleModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const submitSample = (e) => {
    e.preventDefault(); // Stop page from reloading
    console.log(`NAME: ${name}`);
    console.log(`MESSAGE: ${message}`);
    setShow(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add a Sample
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your Sample!</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitSample}>
          <Modal.Body>
            <Form.Group controlId="formSampleName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Ronnie"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formSampleMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={message}
                placeholder="Hello!"
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Add Sample
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSampleModal;
