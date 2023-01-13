import { Post } from "../models/post";
import http from "./http";

export const fetchPosts = async (): Promise<Post[]> => {
  return (await http.get("/posts")).data;
};

// export const fetchPostsAmountByUserAndDate = async (): Promise<> => {
// 
  // const posts = (await http.get("/posts/")).data;
  // const groupedByAuthor = posts.reduce((acc, post) => {
    // const { author, date } = post;
    // if (!acc[author.username]) {
        // acc[author.username] = {};
    // }
    // if (!acc[author.username][date]) {
        // acc[author.username][date] = 0;
    // }
    // acc[author][date] += 1;
    // return acc;
  // }, {});
  // const authors = Object.keys(groupedByAuthor);
// 
  // const result = authors.map((author) => {
    // return {
        // author,
        // posts: Object.entries(groupedByAuthor[author]).map(([date, count]) => {
            // return { date, count };
        // })
    // };
  // });
  // 
  // return result;
// };

export const upvotePost = async (postId: string): Promise<void> => {
  return (await http.post(`/posts/${postId}/like`)).data;
};

export const removePostUpvote = async (postId: string): Promise<void> => {
  return (await http.delete(`/posts/${postId}/like`)).data;
};
