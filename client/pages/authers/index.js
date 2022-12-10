import React from "react";
import { allAuthers } from "../api/blogAPIs";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const theme = createTheme();

const UserCard = dynamic(() => import("../../components/UserCard.js"), {
  ssr: false,
});

function Authers({ authers }) {
  // console.log(authers[0])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {authers.map((auther, index) => (
              <UserCard key={index} auther={auther} />
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

export default Authers;

export async function getStaticProps() {
  const data = await allAuthers();
  const authers = data.data;
  // console.log(authers);
  return {
    props: {
      authers,
    }, // will be passed to the page component as props
  };
}


