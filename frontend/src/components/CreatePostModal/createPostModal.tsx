import React from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
interface CreatePostModalProps {
  show: boolean;
  handleClose: () => void;
}
const CreatePostModal = (props: CreatePostModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control type="text" placeholder="Enter A TItle" />
        </FloatingLabel>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="What's on your mind?"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePostModal;
