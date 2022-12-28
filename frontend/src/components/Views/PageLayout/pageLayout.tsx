import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./pageLayout.css";
import { Button } from "react-bootstrap";
import BlogPage from "../BlogPage/blogPage";
import { useNavigate } from "react-router-dom";

const PageLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="page-layout">
      <BlogPage />
      <br />
      <div className="container">
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </div>
  );
};

export default PageLayout;
