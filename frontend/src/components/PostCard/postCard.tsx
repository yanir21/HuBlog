import React, { useMemo, useState } from "react";
import "./postCard.css";
import { Card } from "react-bootstrap";
import { Post } from "../../models/post";
import { Trash, Pencil } from "react-bootstrap-icons";
import DeletePostModal from "../DeletePostModal/deletePostModal";

interface PostCardProps {
  post: Post;
  onPostEdit: () => void;
  onPostDelete: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { post, onPostEdit } = props;
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowValidationModal(false);
  };

  const dateString = useMemo(() => {
    const date = new Date(post.date);
    return `${date.toLocaleDateString()} on ${date
      .toLocaleTimeString()
      .slice(0, 5)}`;
  }, [post]);

  return (
    <div className="post-card">
      <Card.Header>
        <div className="top-details">
          <span className="autor-details">{post.author.username}</span>
          <span className="actions">
            <Pencil className="edit-icon" onClick={onPostEdit} />
            <Trash
              className="delete-icon"
              onClick={setShowValidationModal.bind(this, true)}
            />
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {post.title}
          <span className="time-details">{dateString}</span>
        </Card.Title>
        <div className="content">{post.content}</div>
      </Card.Body>
      <DeletePostModal
        show={showValidationModal}
        post={post}
        handleClose={closeModal}
        postDeletedFailed={closeModal}
        postDeleted={() => {
          closeModal();
          props.onPostDelete();
        }}
      />
    </div>
  );
};

export default PostCard;
