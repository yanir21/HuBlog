import axios from "axios";
import { redirect } from "react-router-dom";
import { auth } from "../firebase";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

http.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
