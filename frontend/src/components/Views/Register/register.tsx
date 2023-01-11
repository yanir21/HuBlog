import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./register.css";
import { Button } from "react-bootstrap";
import http from "../../../services/http";
import { Link, useNavigate } from "react-router-dom";
import { promptError, promptSuccess } from "../../../services/toast";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, error, data } = useMutation(
    async () => {
      await createUserWithEmailAndPassword(auth, email, password);
      return http.post("/register", {
        headers: { "Content-Type": "application/json" },
        body: {
          username: username,
          email: email,
        },
      });
    },
    {
      onSuccess: ({ data }) => {
        promptSuccess("Successfully Registered");
        navigate("/login");
      },
      onError: (error) => {
        promptError("Error occured");
        console.log(error);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <div className="login-page">
      <br />
      <h4>Welcome to HuBlog!</h4>
      <h5>Register Now:</h5>
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
          Register
        </Button>
        <br />
        <br />
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default Register;
