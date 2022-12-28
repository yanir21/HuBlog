import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./blogPage.css";
import { Button } from "react-bootstrap";
import PostCard from "../../PostCard/postCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/post";
import CreatePostModal from "../../CreatePostModal/createPostModal";

const BlogPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

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
          <></>
        )}
      </div>
      <CreatePostModal
        show={showModal}
        handleClose={setShowModal.bind(this, false)}
        postCreated={() => {}}
        postCreationFailed={() => {}}
      />
    </div>
  );
};

export default BlogPage;
