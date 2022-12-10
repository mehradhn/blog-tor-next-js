import React from "react";
import { BestAuthers } from "./api/blogAPIs";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserCard from "../components/UserCard";

const theme = createTheme();

function TopAuthers() {
  const { data, isLoading } = useQuery({
    queryKey: ["BEST-AUTHER"],
    queryFn: BestAuthers,
  });

  if (isLoading) return <CircularIndeterminate />;
  console.log(data.data);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data?.data.map((auther, index) => (
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

export default TopAuthers;
