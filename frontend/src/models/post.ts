import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  date: Date;
  author: User;
  content: string;
  upvotes: { username: string }[];
}
