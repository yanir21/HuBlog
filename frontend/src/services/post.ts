import { Post } from "../models/post";
import http from "./http";

export const fetchPosts = async (): Promise<Post[]> => {
  return (await http.get("/posts")).data;
};
