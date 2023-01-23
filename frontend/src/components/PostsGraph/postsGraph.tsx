import React, { useEffect, useState, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPostsByDate } from "../../services/post";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { sortByidDesc } from "../../hooks/useSocketSubscription";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PostsGraph = () => {
  const { data: postsamount, isLoading } = useQuery({
    queryKey: ["postamount"],
    staleTime: Infinity,
    queryFn: fetchPostsByDate,
  });

  const sortedPosts = useMemo(
    () => postsamount?.sort(sortByidDesc),
    [postsamount]
  );
  console.log(postsamount);

  // console.log(aggregatedPosts);

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  );
  const labels = sortedPosts?.map((amountData) => amountData._id);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Posts Per Day",
        data: sortedPosts?.map((amountData) => amountData.count) ?? [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <br />
      <br />
      {postsamount && postsamount.length > 0 && (
        <Line options={options} data={data} />
      )}
    </>
  );
};

export default PostsGraph;
