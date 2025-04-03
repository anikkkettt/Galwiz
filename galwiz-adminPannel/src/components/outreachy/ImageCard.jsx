import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ImageCard({ item }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" image={item.src} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {item.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Tag: {item.tag}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
