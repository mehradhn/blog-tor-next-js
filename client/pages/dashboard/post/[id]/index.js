import { useState, useEffect } from "react";
import { Blog, Me, editBlog } from "../../../api/blogAPIs";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import CircularIndeterminate from "../../../../components/CircularIndeterminate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";

const theme = createTheme();

const Post = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(data.content);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [url, setUrl] = useState(data.imgurl);
  const [title, setTitle] = useState(data.title);
  const [id] = useState(data._id);

  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      // console.log(re);
      setLoading(false);
    },
    onError: (res) => {
      router.push("/login");
    },
  });

  const edit = useMutation({
    mutationFn: editBlog,
    onSuccess: (res) => {
      console.log(res);
      router.push("/dashboard/posts");
    },
    onError: (res) => {
      return alert("hoyyy");
    },
  });

  useEffect(() => {
    if (token) return CheckMe.mutate();
    else router.push("/login");
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const editData = {
      blogId: id,
      data: {
        title: title,
        content: value,
        imgurl: url,
      },
    };
    if (
      editData.data.title.trim().length === 0 ||
      editData.data.content.trim().length === 0 ||
      editData.data.imgurl.trim().length === 0
    ) {
      return alert("please fill all the blank");
    }
    console.log(editData);
    edit.mutate(editData);
  };

  const urlChangeHandler = (e) => {
    setUrl(e.target.value);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  if (loading) return <CircularIndeterminate />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="imgurl"
              label="ImageUrl"
              name="imgurl"
              autoFocus
              value={url}
              onChange={urlChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="title"
              type="text"
              id="title"
              value={title}
              onChange={titleHandler}
            />
            <ReactQuill
              style={{ height: 200, width: 500 }}
              value={value}
              onChange={setValue}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export const getServerSideProps = async (context) => {
  const post = await Blog(context.params.id);
  console.log(post);
  const data = post.data;
  //   console.log(response.json())
  return {
    props: {
      data,
    },
  };
};

export default Post;
