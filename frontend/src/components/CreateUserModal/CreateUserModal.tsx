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
  const [rating, setRating] = useState<number>(1);

  useEffect(() => {
    const { existingUser } = props;
    if (existingUser) {
      setRating(existingUser.rating);
    } else {
      setRating(1);
    }
  }, [props.existingUser]);

  const [errorMessage, setErrorMessage] = useState<String>("");
  const { mutate, isLoading, error, data } = useMutation(
    (user: { rating: number }) => {
      return http.put(`/users/${props.existingUser._id}`, {
        headers: { "Content-Type": "application/json" },
        body: user,
      })
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
    if (rating > 5 || rating < 0 || rating === undefined) {
      setErrorMessage("Rating can't be more than 5 or lower than 0!");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    if (validateForm()) {
      mutate({ rating: rating });
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Edit user"}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Rating" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter A Rating"
            value={rating}
            onChange={({ target }) => setRating(Number(target.value))}
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
