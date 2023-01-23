import React, { useEffect, useState, ReactNode } from "react";
import Login from "../Login/login";
import "./pageLayout.css";
import { Button } from "react-bootstrap";
import PostsPage from "../PostsPage/postsPage";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useQueryClient } from "@tanstack/react-query";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const queryClient = useQueryClient();
  const logOut = () => {
    auth.signOut();
    queryClient.setQueryData(["user"], null);
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
