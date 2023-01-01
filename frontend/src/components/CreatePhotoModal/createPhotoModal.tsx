import React, { useEffect, useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import http from "../../services/http";
import { Photo } from "../../models/photo";
import { WithContext as ReactTags } from "react-tag-input";
import { AxiosError } from "axios";
import "./createPhotoModal.css";
interface CreatePhotoModalProps {
  show: boolean;
  handleClose: () => void;
  photoCreated: () => void;
  photoCreationFailed: () => void;
  photoEdited: () => void;
  existingPhoto?: Photo;
}
const CreatePhotoModal = (props: CreatePhotoModalProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const { existingPhoto } = props;
    if (existingPhoto) {
      setImageUrl(existingPhoto.imageUrl);
      setCaption(existingPhoto.caption);
      setTags(existingPhoto.tags.map((tag) => ({ text: tag, id: tag })));
    } else {
      setImageUrl("");
      setCaption("");
      setTags([]);
    }
  }, [props.existingPhoto]);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate, isLoading, error, data } = useMutation(
    (photo: { imageUrl: string; caption: string; tags: string[] }) => {
      return props.existingPhoto
        ? http.put(`/photos/${props.existingPhoto._id}`, {
            headers: { "Content-Type": "application/json" },
            body: photo,
          })
        : http.post("/photos", {
            headers: { "Content-Type": "application/json" },
            body: photo,
          });
    },
    {
      onSuccess: ({ data }) => {
        props.existingPhoto ? props.photoEdited() : props.photoCreated();
      },
      onError: (err) => {
        props.photoCreationFailed();
      },
    }
  );

  const validateForm = () => {
    if (imageUrl.length === 0) {
      setErrorMessage("Don't forget to fill the image URL!");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    if (validateForm()) {
      mutate({
        imageUrl: imageUrl,
        caption: caption,
        tags: tags.map((tag) => tag.text),
      });
    }
  };

  const handleTabAdd = (newTag) => {
    setTags((tags) => [...tags, newTag]);
  };

  const handleTabDelete = (index) => {
    setTags((tags) => tags.filter((tag, currIndex) => currIndex != index));
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const suggestions = [
    { id: "1", text: "mango" },
    { id: "2", text: "pineapple" },
    { id: "3", text: "orange" },
    { id: "4", text: "pear" },
  ];

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.existingPhoto ? "Edit photo" : "Create New Photo"}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter A URL"
            value={imageUrl}
            onChange={({ target }) => setImageUrl(target.value)}
          />
        </FloatingLabel>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Caption this image"
          value={caption}
          onChange={({ target }) => setCaption(target.value)}
        />
        <div className="tag-container">
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={[KeyCodes.comma, KeyCodes.enter]}
            handleDelete={handleTabDelete}
            handleAddition={handleTabAdd}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Add tags..."
            classNames={{ tagInputField: "form-control" }}
          />
        </div>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {props.existingPhoto ? "Edit" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePhotoModal;
