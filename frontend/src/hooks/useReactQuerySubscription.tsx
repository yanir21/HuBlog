import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Post } from "../models/post";

export const useSocketSubscription = (queryClient: QueryClient) => {
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const socket = io("http://localhost:3001", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    socket.on("new-post", (data) =>
      queryClient.setQueryData(["posts"], (oldData: Post[]) =>
        [...oldData, data].sort(sortByDate)
      )
    );
    socket.on("new-photo", (data) =>
      queryClient.setQueryData(["photos"], (oldData: Post[]) =>
        [...oldData, data].sort(sortByDate)
      )
    );
    return () => {
      socket.close();
    };
  }, [queryClient]);
};

const sortByDate = (a: { date: string }, b: { date: string }) => {
  const date1 = a.date.split("/").reverse().join("");
  const date2 = b.date.split("/").reverse().join("");
  return date2 > date1 ? 1 : date2 < date1 ? -1 : 0;
};
