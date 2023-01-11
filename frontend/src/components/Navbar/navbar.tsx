import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { getCurrentUser } from "../../services/user";
import "./navbar.css";
const AppNavbar = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getCurrentUser,
  });

  const logOut = () => {
    auth.signOut();
    queryClient.setQueryData(["user"], null);
  };

  return (
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
        {user?.isAdmin && (
          <Nav.Link as={Link} to="/admin">
            Manage Site
          </Nav.Link>
        )}
      </Nav>
      <div className="user-details">
        {user && (
          <>
            <span>Connected as {user.username}</span>
            <div className="log-out-button" onClick={logOut}>
              Log Out
            </div>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default AppNavbar;
