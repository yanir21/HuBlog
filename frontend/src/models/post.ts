import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  author: User;
  content: string;
}
