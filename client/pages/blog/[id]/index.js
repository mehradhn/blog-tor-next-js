import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Blog } from "../../api/blogAPIs";
import DOMPurify from "dompurify";
import moment from "moment";
import dynamic from "next/dynamic";

const SingleCard = dynamic(() => import("../../../components/SingleCard"), {
  ssr: false,
});

export default function SingleBlog({ data }) {
  // console.log(data);

  return (

      <SingleCard blog={data} />

  );
}

export const getServerSideProps = async (context) => {
  const post = await Blog(context.params.id);
  const data = post.data;
  return {
    props: {
      data,
    },
  };
};
