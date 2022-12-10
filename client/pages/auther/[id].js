import React from "react";
import { blogsByUser, allAuthers } from "../api/blogAPIs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const SpecificBlog = dynamic(() => import("../../components/SpecificBlog"), {
  ssr: false,
});
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const theme = createTheme();

function Blogs({ blogs }) {
  console.log(blogs);
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
            {blogs.map((blog, index) => (
             <SpecificBlog key={index} blog={blog}/>
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
    </ThemeProvider>
  );
}

export default Blogs;

export async function getServerSideProps(context) {
  console.log(context.query.id);
  const x = await fetch("http://localhost:4000/blog/by-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: context.query.id,
    }),
  });

  const blogs = await x.json();
  // console.log(blogs);
  // const blogs = blogsByUser(context.query.id)

  return {
    props: {
      blogs,
    },
  };
}
