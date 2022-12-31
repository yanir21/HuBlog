import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./blogPage.css";
import { Button } from "react-bootstrap";
import PostCard from "../../PostCard/postCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/post";
import CreatePostModal from "../../CreatePostModal/createPostModal";
import { Post } from "../../../models/post";

const BlogPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<Post>();
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const closeModal = () => {
    setEditedPost(undefined);
    setShowModal(false);
  };

  return (
    <div className="blog-page">
      <div className="top-row">
        <span className="top-title">Recent Posts</span>
        <span>
          <Button onClick={setShowModal.bind(this, true)}>
            Create New Post
          </Button>
        </span>
      </div>
      <div className="posts-container">
        {isLoading ? (
          <>Loading Your Data...</>
        ) : !data || data.length === 0 ? (
          <>No Posts to show</>
        ) : (
          data.map((blogPost) => (
            <PostCard
              key={blogPost._id}
              post={blogPost}
              onPostEdit={() => {
                setEditedPost(blogPost);
                setShowModal(true);
              }}
            />
          ))
        )}
      </div>
      <CreatePostModal
        show={showModal}
        handleClose={closeModal}
        postCreated={closeModal}
        postCreationFailed={closeModal}
        existingPost={editedPost}
      />
    </div>
  );
};

export default BlogPage;
