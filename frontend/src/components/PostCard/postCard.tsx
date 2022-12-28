import React from "react";
import "./postCard.css";
import { Card } from "react-bootstrap";

const PostCard = () => {
  return (
    <div className="post-card">
      <Card.Header>
        <div className="top-details">
          <span className="autor-details">Idan Arad</span>
          <span className="time-details">Posted on 11/02/2022 on 13:45</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>My Trip to Thailand</Card.Title>
        <div className="content">AbcEfg</div>
      </Card.Body>
    </div>
  );
};

export default PostCard;
