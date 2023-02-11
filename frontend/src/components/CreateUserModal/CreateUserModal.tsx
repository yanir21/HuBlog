import React, { useEffect, useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { User } from "../../models/user";
interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  userEdited: () => void;
  userEditFailed: () => void;
  existingUser?: User;
}
const CreateUserModal = (props: CreateUserModalProps) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const { existingUser } = props;
    if (existingUser) {
      setUsername(existingUser.username);
    }
  }, [props.existingUser]);

  const [errorMessage, setErrorMessage] = useState<String>("");
  const { mutate } = useMutation(
    (user: { username: string }) => {
      return http.put(`/users/${props.existingUser._id}`, {
        headers: { "Content-Type": "application/json" },
        body: user,
      });
    },
    {
      onSuccess: ({ data }) => {
        props.userEdited();
      },
      onError: (err) => {
        props.userEditFailed();
      },
    }
  );

  const validateForm = () => {
    if (!username || username.length < 3) {
      setErrorMessage("Username can't be less than 3 characters long!");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    if (validateForm()) {
      mutate({ username: username });
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Edit user"} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter A Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FloatingLabel>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {props.existingUser ? "Edit" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
