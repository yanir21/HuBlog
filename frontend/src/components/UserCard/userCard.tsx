import React, { useMemo, useState } from "react";
import "./userCard.css";
import { Card } from "react-bootstrap";
import { User } from "../../models/user";
import { Trash, Pencil } from "react-bootstrap-icons";
import DeleteUserModal from "../DeleteUserModal/deleteUserModal";

interface UserCardProps {
  user: User;
  onUserEdit: () => void;
  onUserDelete: () => void;
  showActions: boolean;
}

const UserCard = (props: UserCardProps) => {
  const { user, onUserEdit, showActions } = props;
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowValidationModal(false);
  };

  const dateString = useMemo(() => {
    const date = new Date(user.birthdate);
    return `${date.toLocaleDateString()}`;
  }, [user]);

  return (
    <div
      className={`user-card ${
        user.isAdmin ? "user-card-admin" : "user-card-not-admin"
      }`}
    >
      <div className="top-user-details">
        <span className="username-details">{user.username}</span>
        {showActions && (
          <span className="actions">
            <Pencil className="edit-icon" onClick={onUserEdit} />
            <Trash
              className="delete-icon"
              onClick={setShowValidationModal.bind(this, true)}
            />
          </span>
        )}
      </div>
      <div className="user-content">
        <span className="username-birthdate">Born on: {dateString}</span>
        <span className="username-rating">
          Rating: {user.rating.toString()} Stars
        </span>
      </div>
      <DeleteUserModal
        show={showValidationModal}
        user={user}
        handleClose={closeModal}
        userDeletedFailed={closeModal}
        userDeleted={() => {
          closeModal();
          props.onUserDelete();
        }}
      />
    </div>
  );
};

export default UserCard;
