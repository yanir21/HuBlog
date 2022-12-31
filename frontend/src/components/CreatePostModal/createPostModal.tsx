import React, { useEffect, useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { Post } from "../../models/post";
import { AxiosError } from "axios";
interface CreatePostModalProps {
  show: boolean;
  handleClose: () => void;
  postCreated: () => void;
  postCreationFailed: () => void;
  postEdited: () => void;
  existingPost?: Post;
}
const CreatePostModal = (props: CreatePostModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const { existingPost } = props;
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
    }
  }, [props.existingPost]);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate, isLoading, error, data } = useMutation(
    (post: { content: string; title: string }) => {
      return props.existingPost
        ? http.put(`/posts/${props.existingPost._id}`, {
            headers: { "Content-Type": "application/json" },
            body: post,
          })
        : http.post("/posts", {
            headers: { "Content-Type": "application/json" },
            body: post,
          });
    },
    {
      onSuccess: ({ data }) => {
        props.existingPost ? props.postEdited() : props.postCreated();
      },
      onError: (err) => {
        props.postCreationFailed();
      },
    }
  );

  const validateForm = () => {
    if (title.length === 0) {
      setErrorMessage("Don't forget to fill a title!");
      return false;
    }
    if (content.length === 0) {
      setErrorMessage("Don't forget to write something!");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    if (validateForm()) {
      mutate({ title: title, content: content });
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.existingPost ? "Edit post" : "Create New Post"}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter A TItle"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </FloatingLabel>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="What's on your mind?"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {props.existingPost ? "Edit" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePostModal;
