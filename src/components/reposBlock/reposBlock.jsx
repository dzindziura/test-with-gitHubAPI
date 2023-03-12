import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ReposBlock({ data }) {
  const elements = data.map((item, index) => {
    return (
      <Card variant="outlined" key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.full_name}
          </Typography>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="h9" component="div">
            Forks: {item.forks} Star: {item.stargazers_count}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.language}
          </Typography>
          <Typography variant="body2">
            Create at: {item.created_at.slice(0, 10)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={item.html_url} target="_blank">Go to repo</Button>
        </CardActions>
      </Card>
    );
  });
  return (
    <Box sx={{ minWidth: 275 }} className="grid grid-cols-4">
      {elements}
    </Box>
  );
}
