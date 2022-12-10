import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import { Me, SubmitBlog } from "../api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import Cookies from "universal-cookie";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuil = dynamic(() => import("react-quill"), { ssr: false });

const theme = createTheme();

export default function Create() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const router = useRouter();
  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      // console.log('hey you');
      setLoading(false);
    },
    onError: (res) => {
      router.push("/login");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (token) {
      CheckMe.mutate();
    } else {
      router.push("/login");
    }
  }, []);

  const addBlog = useMutation({
    mutationFn:SubmitBlog,
    onSuccess: (res) => {
      router.push("/dashboard/posts");
    },
    onError:(res) => {
      console.log(res)
    }
  });





  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const blogInfo = ({
      title: data.get("title"),
      imgurl: data.get("imgurl"),
      content: value,
    })
    if (
      blogInfo.content.trim().length === 0 ||
      blogInfo.title.trim().length === 0 ||
      blogInfo.imgurl.trim().length === 0
    )
      return alert("please fill all the blanks");
    // please edit later
    addBlog.mutate(blogInfo)
    // console.log(blogInfo)

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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="title"
              type="text"
              id="title"
            />
            <ReactQuil
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
}
