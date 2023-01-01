import React, { useMemo, useState } from "react";
import "./photoCard.css";
import { Card } from "react-bootstrap";
import { Photo } from "../../models/photo";
import { Trash, Pencil } from "react-bootstrap-icons";
import DeletePhotoModal from "../DeletePhotoModal/deletePhotoModal";

interface PhotoCardProps {
  photo: Photo;
  onPhotoEdit: () => void;
  onPhotoDelete: () => void;
  showActions: boolean;
}

const PhotoCard = (props: PhotoCardProps) => {
  const { photo, onPhotoEdit, showActions } = props;
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowValidationModal(false);
  };

  const dateString = useMemo(() => {
    const date = new Date(photo.date);
    return `${date.toLocaleDateString()} on ${date
      .toLocaleTimeString()
      .slice(0, 5)}`;
  }, [photo]);

  return (
    <div className="photo-card">
      <Card.Header>
        <div className="top-details">
          <span className="autor-details">{photo.author.username}</span>
          {showActions && (
            <span className="actions">
              <Pencil className="edit-icon" onClick={onPhotoEdit} />
              <Trash
                className="delete-icon"
                onClick={setShowValidationModal.bind(this, true)}
              />
            </span>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <img className="content" src={photo.imageUrl} />
      </Card.Body>
      <Card.Title>
        {photo.caption}
        <span className="time-details">{dateString}</span>
      </Card.Title>
      <div className="tags">
        {photo.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <DeletePhotoModal
        show={showValidationModal}
        photo={photo}
        handleClose={closeModal}
        photoDeletedFailed={closeModal}
        photoDeleted={() => {
          closeModal();
          props.onPhotoDelete();
        }}
      />
    </div>
  );
};

export default PhotoCard;
