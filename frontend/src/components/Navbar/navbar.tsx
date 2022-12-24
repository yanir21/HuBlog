import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
interface AppNavbarProps {
  setShowCart: (value: boolean) => void;
}
const AppNavbar = (props: AppNavbarProps) => (
  <Navbar bg="primary" variant="dark" className="navbar">
    <Navbar.Brand href="/" className="brand">
      Shufersal Online
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link onClick={() => props.setShowCart(false)}>Home</Nav.Link>
      <Nav.Link onClick={() => props.setShowCart(true)}>Shopping Cart</Nav.Link>
    </Nav>
  </Navbar>
);

export default AppNavbar;
