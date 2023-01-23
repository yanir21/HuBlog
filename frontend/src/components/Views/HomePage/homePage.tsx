import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../PageLayout/pageLayout";
import { io } from "socket.io-client";
import "./homepage.css";

const HomePage = () => (
  <PageLayout>
    <div className="home-page">
      <div>
        <h2>
          Welcome to <label className="site-name">HuBlog!</label>
        </h2>
        <div className="link-container">
          <Link to="/posts" className="post-container">
            <div className="bg-image bg-post-image"></div>
            <div className="bg-text">Browse Posts</div>
          </Link>
          <Link to="/photos" className="post-container">
            <div className="bg-image bg-photo-image"></div>
            <div className="bg-text">Browse Photos</div>
          </Link>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default HomePage;
