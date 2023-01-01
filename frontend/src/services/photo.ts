import { Photo } from "../models/photo";
import http from "./http";

export const fetchPhoto = async (): Promise<Photo[]> => {
  return (await http.get("/photos")).data;
};
