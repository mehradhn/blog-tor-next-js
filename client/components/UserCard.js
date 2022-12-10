import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";


export default function UserCard({ auther }) {
  console.log(auther)
  const router = useRouter()
  const navigateHandler = (id) => {
    router.push(`./auther/${id}`)
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        onClick={() => navigateHandler(auther._id)}
        sx={{ maxWidth: 345, height: 350, backgroundColor: "#f7ffb3" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt={auther.username}
            src={"http://localhost:4000/" + auther.avatar}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <CardContent sx={{ marginTop: 6 }}>
          <Typography gutterBottom variant="p" component="div">
           <em>{auther.username}</em> 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {auther.bio}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

// "http://localhost:4000/" + auther.avatar
