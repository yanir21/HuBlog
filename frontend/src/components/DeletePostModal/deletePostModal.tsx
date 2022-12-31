import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { Post } from "../../models/post";
import { AxiosError } from "axios";
interface DeletePostModalProps {
  show: boolean;
  handleClose: () => void;
  postDeleted: () => void;
  postDeletedFailed: () => void;
  post: Post;
}
const DeletePostModal = (props: DeletePostModalProps) => {
  const { mutate, isLoading, error, data } = useMutation(
    () => {
      return http.delete(`/posts/${props.post._id}`, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: ({ data }) => {
        props.postDeleted();
      },
      onError: (err) => {
        props.postDeletedFailed();
      },
    }
  );

  return (
    <Modal show={props.show}>
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => mutate()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePostModal;
