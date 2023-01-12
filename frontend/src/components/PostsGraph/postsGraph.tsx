import ResizableBox from "./resizableBox";
import useDemoConfig from "./useDemoConfig";
import React, { useEffect, useState, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPostsAmountByUserAndDate } from "../../services/post";
import { DataResult } from "@remix-run/router/dist/utils";

const PostsGraph = () => {
  // const { data, randomizeData } = useDemoConfig({
    // series: 3,
  // dataType: "ordinal",
  // });
  type post = {
    date: Date,
    amount: number,
  }
  
  type Series = {
    label: string,
    data: post[]
  }
  // 
  // const data: Series[] = [
    // {
      // label: 'React Charts', // Will be author
      // data: [
        // {
          // date: new Date(), // Date posted
          // amount: 202123, // Amount posted
        // }
      // ]
    // },
    // {
      // label: 'React Query',   // Will be author
      // data: [
        // {
          // date: new Date(), // Date posted
          // amount: 10234230, // Amount posted
        // }
//        ...
      // ]
    // }
  // ]
// 
  const data = useQuery({
    queryKey: ["postsandamount"],
    staleTime: Infinity,
    queryFn: fetchPostsAmountByUserAndDate,
  });

  console.log(data);
  
  // const fixedData : Series[] = 
    // data?.map((anObjectMapped, index) => {
      // return (
        // {
          // label: anObjectMapped[index].author,   // Will be author
          // data: [
            // {
              // date: anObjectMapped[index].date, // Date posted
              // amount: anObjectMapped[index].sum, // Amount posted
            // }
          // ]
        // }
      // );
  // });

  
  const primaryAxis = React.useMemo(
    (): AxisOptions<post> => ({
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<post>[] => [
      {
        getValue: datum => datum.amount,
      },
    ],
    []
  )


  return (
    <>
      <br />
      <br />
      <ResizableBox>
        {/* <Chart
          options={{
            fixedData,
            primaryAxis,
            secondaryAxes,
          }}
        /> */}
      </ResizableBox>
    </>
  );
}

export default PostsGraph;
  