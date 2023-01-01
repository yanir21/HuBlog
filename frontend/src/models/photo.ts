import { User } from "./user";

export interface Post {
  _id: string;
  date: Date;
  author: User;
  imageUrl: string;
  caption: string;
  tags: string[];
}
