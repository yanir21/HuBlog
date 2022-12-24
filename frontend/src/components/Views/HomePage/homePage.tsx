import React, { useEffect, useState } from "react";
import Login from "../Login/login";
import "./homepage.css";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="home">
      <div className="container">{token ? <>Hello</> : <Login />}</div>
    </div>
  );
};

export default Home;
