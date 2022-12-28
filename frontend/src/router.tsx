import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Views/Login/login";
import Register from "./components/Views/Register/register";
import PageLayout from "./components/Views/PageLayout/pageLayout";

const Router = () => (
  <Routes>
    <Route path="/" element={<PageLayout />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default Router;
