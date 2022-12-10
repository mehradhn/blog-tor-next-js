import { useRef, useEffect, useState } from "react";
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
import {
  Me,
  getComments,
  submitComment,
  rateBlog,
} from "../pages/api/blogAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import Rating from "@mui/material/Rating";
import CircularIndeterminate from "./CircularIndeterminate";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

function SingleCard({ blog }) {
  console.log(blog);
  const content = useRef(null);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(false);
  const [value, setValue] = useState(blog.averageScore);
  const checkUser = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      //   console.log(res);
      setUser(true);
    },
    onError: (res) => {
      //   console.log(res);
    },
  });

  useEffect(() => {
    if (content.current) {
      content.current.innerHTML = blog.content;
    }
  }, [content.current]);

  useEffect(() => {
    checkUser.mutate();
  }, []);

  const submit = useMutation({
    mutationFn: submitComment,
    onSuccess: (res) => {
      console.log(res);
      refetch();
    },
  });

  const rate = useMutation({
    mutationFn: rateBlog,
    onSuccess: (res) => {
      console.log("rate");
      refetch();
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comment"],
    queryFn: () => getComments(blog._id),
  });
  if (isLoading) return <CircularIndeterminate />;

  const submitHandler = () => {
    // console.log(comment);
    if (comment.trim().length === 0) return alert("hey");
    const info = {
      text: comment,
      blogId: blog._id,
    };
    submit.mutate(info);
    setComment("");
  };
  const rateHandler = (event, newValue) => {
    console.log(newValue);
    const info = {
      blogId: blog._id,
      score: +newValue
    };
    rate.mutate(info);
  };
  return (
    <Box
      sx={{
        width: "100 vw",
        height: "110vh",
        display: "flex",

        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Card sx={{ width: 700, marginLeft: 3, marginTop: 2 }}>
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
            height="auto"
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
            {user ? (
              <Rating
                name="half-rating-read"
                // defaultValue={2.5}
                value={value}
                onChange={rateHandler}
                precision={0.5}
              />
            ) : (
              <Rating
                name="half-rating-read"
                // defaultValue={2.5}
                value={value}
                precision={0.5}
                readOnly
              />
            )}
          </CardActions>
          {/* <em>rate is:{value}</em> */}
        </Card>
      </Box>

      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 5 }}>
        {user ? (
          <>
            <Box
              sx={{
                dispay: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <TextField
                multiline
                id="standard-basic"
                label="Comment"
                variant="standard"
                sx={{ marginTop: 2, width: 600 }}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </Box>

            <Button
              onClick={submitHandler}
              sx={{ width: 100 }}
              variant="contained"
            >
              submit
            </Button>
            <Divider />
          </>
        ) : (
          ""
        )}

        <Box>
          {data.data.length === 0 && (
            <Box sx={{ marginTop: 3 }}>
              <em>There is no Comment</em>
            </Box>
          )}

          {data.data.length !== 0 && (
            <Box
              sx={{
                padding: 3,
              }}
            >
              {data.data.map((comment, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      border: 1,
                      borderRadius: "16px",
                      padding: 1,
                      marginTop: 1,
                      display: "flex",
                      //   justifyContent: "space-between",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={"http://localhost:4000/" + comment.user.avatar}
                    ></Avatar>
                    <p>{comment.text}</p>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SingleCard;
