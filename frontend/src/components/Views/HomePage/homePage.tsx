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
          <Link to="/posts" className="link">
            Browse Posts
          </Link>
          <Link to="/photos" className="link">
            Browse Photos
          </Link>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default HomePage;
