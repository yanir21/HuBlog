import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
const AppNavbar = () => (
  <Navbar bg="primary" variant="dark" className="navbar">
    <Navbar.Brand href="/" className="brand">
      HuBlog
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link onClick={() => {}}>Home</Nav.Link>
    </Nav>
  </Navbar>
);

export default AppNavbar;
