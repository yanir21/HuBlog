import { User } from "./user";

export interface Photo {
  _id: string;
  date: Date;
  author: User;
  imageUrl: string;
  caption: string;
  tags: string[];
}
