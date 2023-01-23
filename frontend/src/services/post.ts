import { Post } from "../models/post";
import http from "./http";

export const fetchPosts = async (): Promise<Post[]> => {
  return (await http.get("/posts")).data;
};

export const upvotePost = async (postId: string): Promise<void> => {
  return (await http.post(`/posts/${postId}/like`)).data;
};

export const removePostUpvote = async (postId: string): Promise<void> => {
  return (await http.delete(`/posts/${postId}/like`)).data;
};

export const fetchPostsByDate = async (): Promise<
  { _id: string; count: number }[]
> => {
  return (await http.get("/posts/amount")).data;
};
