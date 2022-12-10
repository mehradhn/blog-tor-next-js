import React, { useRef } from "react";
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
import { getAllBlogs } from "../api/blogAPIs";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import dynamic from 'next/dynamic'
const  BlogCards = dynamic(() => import('../../components/BlogCards'), { ssr: false })
const theme = createTheme();

export default function Blogs() {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  // const contentRef = useRef();

  if (isLoading) return <CircularIndeterminate />;
  // console.log(data);

  // console.log(data[0].imgurl);

  const navigateHandler = (_id) => {
    router.push(`blog/${_id}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((blog, index) => (
             <BlogCards key={index} blog={blog}/>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
