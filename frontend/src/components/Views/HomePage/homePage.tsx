import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./homepage.css";
import { Button } from "react-bootstrap";

const Home = () => {
  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="home">
      <div className="container">{token ? <>Hello</> : <Login />}</div>
      <br />
      {token && <Button onClick={logOut}>Log Out</Button>}
    </div>
  );
};

export default Home;
