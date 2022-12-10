import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        zIndex: 3000,
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
