import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./login.css";
import { Button } from "react-bootstrap";
import http from "../../../services/http";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, error, data } = useMutation(
    (user: { username: string; password: string }) => {
      return http.post("/login", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    },
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ username, password });
  };

  return (
    <div className="login-page">
      <br />
      <h4>Welcome to HuBlog!</h4>
      <h5>Log in to view posts</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row">
            <div className="col-4">
              <label htmlFor="username">Username:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <label htmlFor="password">Password:</label>
            </div>
            <div className="col-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="submit-button">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
