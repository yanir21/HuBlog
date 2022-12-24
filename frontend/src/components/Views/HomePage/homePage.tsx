import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./homepage.css";
import { Button } from "react-bootstrap";
import BlogPage from "../BlogPage/blogPage";

const Home = () => {
  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="home">
      {token ? (
        <BlogPage />
      ) : (
        <div className="container">
          <Login />
        </div>
      )}
      <br />
      <div className="container">
        {token && <Button onClick={logOut}>Log Out</Button>}
      </div>
    </div>
  );
};

export default Home;
