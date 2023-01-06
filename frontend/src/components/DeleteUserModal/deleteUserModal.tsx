import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { User } from "../../models/user";
import { AxiosError } from "axios";
interface DeleteUserModalProps {
  show: boolean;
  handleClose: () => void;
  userDeleted: () => void;
  userDeletedFailed: () => void;
  user: User;
}
const DeleteUserModal = (props: DeleteUserModalProps) => {
  const { mutate, isLoading, error, data } = useMutation(
    () => {
      return http.delete(`/users/${props.user._id}`, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: ({ data }) => {
        props.userDeleted();
      },
      onError: (err) => {
        props.userDeletedFailed();
      },
    }
  );

  return (
    <Modal show={props.show}>
      <Modal.Body>Are you sure you want to delete this user? {props.user.username}</Modal.Body>
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

export default DeleteUserModal;
