import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { Photo } from "../../models/photo";

interface DeletePhotoModalProps {
  show: boolean;
  handleClose: () => void;
  photoDeleted: () => void;
  photoDeletedFailed: () => void;
  photo: Photo;
}
const DeletePhotoModal = (props: DeletePhotoModalProps) => {
  const { mutate, isLoading, error, data } = useMutation(
    () => {
      return http.delete(`/photos/${props.photo._id}`, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: ({ data }) => {
        props.photoDeleted();
      },
      onError: (err) => {
        props.photoDeletedFailed();
      },
    }
  );

  return (
    <Modal show={props.show}>
      <Modal.Body>Are you sure you want to delete this photo?</Modal.Body>
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

export default DeletePhotoModal;
