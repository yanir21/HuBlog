import { User } from "../models/user";
import http from "./http";

export const getCurrentUser = async (): Promise<User> => {
  return (await http.get("/me")).data;
};
export const getAllUsers = async (): Promise<User[]> => {
  return (await http.get("/users")).data;
};
