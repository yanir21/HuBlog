import React, { useEffect, useState } from "react";
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
import LoadingSpinner from "./components/LoadingSpinner/loadingSpinner";
import { useQueryClient } from "@tanstack/react-query";

const Router = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          queryClient.invalidateQueries(["user"]);
        } else {
          navigate("/login");
        }
        setLoading(false);
      }),
    []
  );

  return loading ? (
    <LoadingSpinner />
  ) : (
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
