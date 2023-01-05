import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Views/Login/login";
import Register from "./components/Views/Register/register";
import PageLayout from "./components/Views/PageLayout/pageLayout";
import HomePage from "./components/Views/HomePage/homePage";
import PostsPage from "./components/Views/PostsPage/postsPage";
import PhotosPage from "./components/Views/PhotosPage/photosPage";
import AdminPage from "./components/Views/AdminPage/adminPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/photos" element={<PhotosPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default Router;
