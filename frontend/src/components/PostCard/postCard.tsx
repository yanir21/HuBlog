import React, { useMemo, useState } from "react";
import "./postCard.css";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Post } from "../../models/post";
import { Trash, Pencil, HandThumbsUp } from "react-bootstrap-icons";
import DeletePostModal from "../DeletePostModal/deletePostModal";
import classNames from "classnames";
import { User } from "../../models/user";
import { removePostUpvote, upvotePost } from "../../services/post";
import { useMutation } from "@tanstack/react-query";

interface PostCardProps {
  post: Post;
  onPostEdit: () => void;
  onPostDelete: () => void;
  showActions: boolean;
  currentUser: User;
}

const PostCard = (props: PostCardProps) => {
  const { post, onPostEdit, showActions, currentUser } = props;
  const [showValidationModal, setShowValidationModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowValidationModal(false);
  };

  const { mutate: handlePostUpvote } = useMutation(async (postId: string) => {
    return await upvotePost(postId);
  });
  const { mutate: handlePostCancelUpvote } = useMutation(
    async (postId: string) => {
      return await removePostUpvote(postId);
    }
  );

  const isUpvoted = useMemo(
    () =>
      post.upvotes
        .map((upvote) => upvote.user.username)
        .includes(currentUser?.username),
    [post, currentUser, post.upvotes.length]
  );

  const upvotesTooltip = useMemo(
    () => (
      <Tooltip>
        {post.upvotes.map((upvote) => (
          <div>{upvote.user.username}</div>
        ))}
      </Tooltip>
    ),
    [post.upvotes]
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
                isUpvoted
                  ? handlePostCancelUpvote(post._id)
                  : handlePostUpvote(post._id);
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
        <div className="post-content">{post.content}</div>
      </Card.Body>
      {post?.upvotes.length > 0 && (
        <Card.Footer>
          <div className="upvotes-label">
            <OverlayTrigger overlay={upvotesTooltip}>
              <label>{post.upvotes.length} Upvotes</label>
            </OverlayTrigger>
          </div>
        </Card.Footer>
      )}
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
