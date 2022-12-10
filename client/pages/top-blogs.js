import React from "react";
import { BestBlog } from "./api/blogAPIs";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../components/CircularIndeterminate";
import SpecificBlog from "../components/SpecificBlog"
import { Box } from "@mui/material";
function TopBlogs() {
  const { data, isLoading } = useQuery({
    queryKey: ["BEST"],
    queryFn: BestBlog,
  });
  if (isLoading) return <CircularIndeterminate />;
  console.log(data);
  return (
    <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center", marginTop:"4em"}}>
      {data?.data.map((blog, index) => (
        <SpecificBlog key={index} blog={blog} />
      ))}
    </Box>
  );
}

export default TopBlogs;
