import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./login.css";
import { Button } from "react-bootstrap";
import http from "../../../services/http";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { promptError, promptSuccess } from "../../../services/toast";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState<string>("");

  const { mutate, isLoading, error, data } = useMutation(
    (user: { email: string; password: string }) =>
      signInWithEmailAndPassword(auth, email, password),
    {
      onSuccess: (data) => {
        promptSuccess("Successfully logged in");
        navigate("/");
      },
      onError: (err: AxiosError) => promptError("Invalid email or password"),
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !email) {
      setErrorLabel("Please fill both email and password");
    } else {
      mutate({ email, password });
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
              <label htmlFor="email">Email:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
