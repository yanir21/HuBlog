import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./blogPage.css";
import { Button } from "react-bootstrap";
import PostCard from "../../PostCard/postCard";

const BlogPage = () => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="blog-page">
      <div className="top-title">Recent Posts</div>
      <div className="posts-container">
        <PostCard />
      </div>
    </div>
  );
};

export default BlogPage;
