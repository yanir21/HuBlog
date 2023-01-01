import React, { useEffect, useState, ReactNode } from "react";
import Login from "../Login/login";
import "./pageLayout.css";
import { Button } from "react-bootstrap";
import PostsPage from "../PostsPage/postsPage";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
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
      {props.children}
      <br />
      <div className="log-out">
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </div>
  );
};

export default PageLayout;
