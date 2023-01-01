import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./navbar.css";
const AppNavbar = () => (
  <Navbar bg="primary" variant="dark" className="navbar">
    <Navbar.Brand href="/" className="brand">
      HuBlog
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/posts">
        Posts
      </Nav.Link>
      <Nav.Link as={Link} to="/photos">
        Photos
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default AppNavbar;
