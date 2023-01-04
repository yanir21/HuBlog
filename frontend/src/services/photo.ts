import { Photo } from "../models/photo";
import http from "./http";

export const fetchPhoto = async (): Promise<Photo[]> => {
  return (await http.get("/photos")).data;
};

export const getPopularTags = async (): Promise<
  { _id: string; count: number }[]
> => {
  return (await http.get("/photos/tags")).data;
};
