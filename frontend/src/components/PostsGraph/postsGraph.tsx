import ResizableBox from "./resizableBox";
import useDemoConfig from "./useDemoConfig";
import React, { useEffect, useState, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/post";
import { DataResult } from "@remix-run/router/dist/utils";

type Post = {
  count: number | unknown;
  date: Date | unknown;
};

type authorPost = {
  author: string;
  date: Date[];
}

type Series = {
  author: string;
  posts: Post[];
};

const PostsGraph = () => {
  // const { data, randomizeData } = useDemoConfig({
  // series: 3,
  // dataType: "ordinal",
  // });

  // const trydata = [
  //   {
  //     label: 'React Charts',
  //     data: [
  //       {
  //         date: new Date(),
  //         stars: 23467238,
  //       },
  //     ],
  //   },
  // ]
  // const data: Series[] = [
  // {
  // author: 'React Charts', // Will be author
  // posts: [
  // {
  // date: new Date(), // Date posted
  // count: 202123, // Amount posted
  // }
  // ]
  // },
  // {
  // author: 'React Query',   // Will be author
  // posts: [
  // {
  // date: new Date(), // Date posted
  // count: 10234230, // Amount posted
  // }
  // ]
  // }
  // ]
  
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    staleTime: Infinity,
    queryFn: fetchPosts,
  });
  
  const aggregatedPosts : Series[] = useMemo(
    () => {
      const groupedByAuthor = data?.reduce((acc , post) => {
        const { author, date } = post;
        if (!acc[author.username]) {
            acc[author.username] = {};
        }
        if (!acc[author.username][date]) {
            acc[author.username][date] = 0;
        }
        acc[author.username][date] += 1;
        return acc;
      }, {})
      if (groupedByAuthor) {
        const authors = Object.keys(groupedByAuthor);
        return authors?.map((author) => {
          const serie : Series = {
            author,
            posts: Object.entries(groupedByAuthor[author]).map(([date, count]) => {
              const post: Post = { count, date };
              return post;
            })
          };
          return serie;
        });
      }
    },
    [data]
  );

  // console.log(aggregatedPosts);

  const primaryAxis = React.useMemo(
    (): AxisOptions<Post> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Post>[] => [
      {
        getValue: (datum) => datum.count,
      },
    ],
    []
  );

  return (
    <>
      <br />
      <br />
      <ResizableBox>
        { <Chart
          options={{
            aggregatedPosts,
            primaryAxis,
            secondaryAxes,
          }}
        /> }
      </ResizableBox>
    </>
  );
};

export default PostsGraph;
