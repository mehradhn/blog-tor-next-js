import React from "react";
import { useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Rating from "@mui/material/Rating";


function BlogCards({ blog }) {
  console.log(blog)
  const content = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (content.current) {
      content.current.innerHTML = blog.content;

      if (content.current.innerText.length > 10)
        content.current.innerText =
          content.current.innerText.slice(0, 20) + "...";
    }
  }, [content.current]);

  const navigateHandler = (_id) => {
    router.push(`/blog/${_id}`);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card onClick={() => navigateHandler(blog._id)} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={"http://localhost:4000/" + blog.creator.avatar}
            >
              {blog.creator.name[0]}
            </Avatar>
          }
          title={blog.creator.username}
          subheader={moment(blog.createdAt).format("MMMM  Do YYYY")}
        />
        <CardMedia
          component="img"
          height="194"
          image={blog.imgurl}
          onError={(e) => {
            e.target.src = "/images/blog-default.png";
          }}
          alt="blog-image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <span ref={content}></span>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <Rating name="half-rating-read" value={blog.averageScore} precision={0.5} readOnly/>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default BlogCards;
