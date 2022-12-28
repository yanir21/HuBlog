import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./login.css";
import { Button } from "react-bootstrap";
import http from "../../../services/http";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState<string>("");

  const { mutate, isLoading, error, data } = useMutation(
    (user: { username: string; password: string }) => {
      return http.post("/login", {
        headers: { "Content-Type": "application/json" },
        body: user,
      });
    },
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      },
      onError: (err: AxiosError) => {
        if ([404, 401].includes(err.response.status)) {
          setErrorLabel("Invalid username or password");
        }
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !username) {
      setErrorLabel("Please fill both username and password");
    } else {
      mutate({ username, password });
    }
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
        {!!errorLabel && <label className="error-label">{errorLabel}</label>}
        <br />
        <Button type="submit" className="submit-button">
          Log in
        </Button>

        <br />
        <br />
        <Link to="/register">Don't have an account yet?</Link>
      </form>
    </div>
  );
};

export default Login;
