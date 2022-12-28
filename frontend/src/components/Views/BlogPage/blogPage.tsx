import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./blogPage.css";
import { Button } from "react-bootstrap";
import PostCard from "../../PostCard/postCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/post";

const BlogPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="blog-page">
      <div className="top-title">Recent Posts</div>
      <div className="posts-container">
        {isLoading ? (
          <>Loading Your Data...</>
        ) : !data || data.length === 0 ? (
          <>No Posts to show</>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
