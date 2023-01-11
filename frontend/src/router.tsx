import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Views/Login/login";
import Register from "./components/Views/Register/register";
import PageLayout from "./components/Views/PageLayout/pageLayout";
import HomePage from "./components/Views/HomePage/homePage";
import PostsPage from "./components/Views/PostsPage/postsPage";
import PhotosPage from "./components/Views/PhotosPage/photosPage";
import AdminPage from "./components/Views/AdminPage/adminPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Router = () => {
  const navigate = useNavigate();
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }),
    []
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
