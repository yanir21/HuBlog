import React, { useMemo, useState } from "react";
import "./postCard.css";
import { Card } from "react-bootstrap";
import { Post } from "../../models/post";
import { Trash, Pencil, HandThumbsUp } from "react-bootstrap-icons";
import DeletePostModal from "../DeletePostModal/deletePostModal";
import classNames from "classnames";
import { User } from "../../models/user";

interface PostCardProps {
  post: Post;
  onPostEdit: () => void;
  onPostDelete: () => void;
  showActions: boolean;
  onUpvote: (postId: string) => void;
  currentUser: User;
}

const PostCard = (props: PostCardProps) => {
  const { post, onPostEdit, showActions, onUpvote, currentUser } = props;
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowValidationModal(false);
  };

  const isUpvoted = useMemo(
    () =>
      post.upvotes
        .map((upvote) => upvote.username)
        .includes(currentUser?.username),
    [post, currentUser, post.upvotes.length]
  );

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
          {showActions ? (
            <span className="actions">
              <Pencil className="edit-icon" onClick={onPostEdit} />
              <Trash
                className="delete-icon"
                onClick={setShowValidationModal.bind(this, true)}
              />
            </span>
          ) : (
            <HandThumbsUp
              className={classNames("upvote", { upvoted: isUpvoted })}
              onClick={() => {
                if (!isUpvoted) {
                  post.upvotes.push({ username: currentUser.username });
                  onUpvote(post._id);
                } else {
                  post.upvotes.filter(
                    (upvote) => upvote.username != currentUser.username
                  );
                }
              }}
            />
          )}
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
