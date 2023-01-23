import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { getToken } from "../firebase";
import { Photo } from "../models/photo";
import { Post } from "../models/post";

export const useSocketSubscription = (queryClient: QueryClient) => {
  const token = getToken();
  useEffect(() => {
    const socket = io("http://localhost:3001", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    ["post", "photo"].forEach((entity) => {
      socket.on(`new-${entity}`, (data) =>
        queryClient.setQueryData([`${entity}s`], (oldData: Post[] | Photo[]) =>
          [...oldData, data].sort(sortByDate)
        )
      );
      socket.on(`updated-${entity}`, (data) =>
        queryClient.setQueryData([`posts`], (oldData: Post[] | Photo[]) =>
          oldData.map((currElement) =>
            currElement._id === data._id ? data : currElement
          )
        )
      );
      socket.on(`deleted-${entity}`, (data) =>
        queryClient.setQueryData([`${entity}s`], (oldData: { _id: string }[]) =>
          oldData.filter((element) => element._id !== data._id)
        )
      );
    });

    return () => {
      socket.close();
    };
  }, [queryClient]);
};

export const sortByDate = (a: { date: string }, b: { date: string }) => {
  const date1 = a.date.split("/").reverse().join("");
  const date2 = b.date.split("/").reverse().join("");
  return date2 > date1 ? 1 : date2 < date1 ? -1 : 0;
};

export const sortByidDesc = (a: { _id: string }, b: { _id: string }) => {
  const date1 = a._id.split("/").reverse().join("");
  const date2 = b._id.split("/").reverse().join("");
  return date2 < date1 ? 1 : date2 > date1 ? -1 : 0;
};
