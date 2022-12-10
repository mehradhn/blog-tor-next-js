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
import Alert from "@mui/material/Alert";
import { signupBlog } from "../api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import { Me } from "../api/blogAPIs";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import CircularIndeterminate from "../../components/CircularIndeterminate";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        BLOG-TOR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [loading, setLoading] = useState(true);

  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      router.push("./dashboard");
    },
  });

  useEffect(() => {
    if (token) CheckMe.mutate(token);
    else setLoading(false);
  }, []);

  const MeMutation = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      router.push("./dashboard");
    },
    onError: (error) => {
      // console.log(error)
      return alert("This username is already exist");
    },
  });

  const router = useRouter();
  const mutationSignUp = useMutation({
    mutationFn: signupBlog,
    onSuccess: (res) => {
      cookies.set("token", res.data.token, { path: "/" });
      MeMutation.mutate();
    },
    onError: (res) => {
      return alert("This username is already exist");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const register = {
      username: data.get("username"),
      name: data.get("name"),
    };
    mutationSignUp.mutate(register);
  };

  if(loading) return <CircularIndeterminate/>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN-UP
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
