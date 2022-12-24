import React from "react";
import "./postCard.css";
import { Card } from "react-bootstrap";

const PostCard = () => {
  return (
    <Card border="secondary">
      <Card.Header>
        <div className="top-details">
          <span className="autor-details">Idan Arad</span>
          <span className="time-details">Posted on 11/02/2022 on 13:45</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>My Trip to Thailand</Card.Title>
        <Card.Text>
          <div className="content">AbcEfg</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
