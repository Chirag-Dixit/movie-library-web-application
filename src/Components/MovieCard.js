import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddIcon from "@mui/icons-material/Add";

const MovieCard = () => {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetch(
        "http://www.omdbapi.com/?t=boyhood&apikey=790948c6"
      );
      const movieData = await data.json();
      setTemp(movieData);
      console.log(temp);
    };

    getMovie();
  }, []);
  console.log(temp);

  return (
    <Card
      sx={{
        width: "20%",
      }}
    >
      <CardHeader
        title={temp.Title}
        subheader={temp.Released}
        action={
          <IconButton>
            <BookmarkAddIcon />
          </IconButton>
        }
      />

      <CardMedia component="img" height={"300px"} image={temp.Poster} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {temp.Plot}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip title='add to favourites'>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
        </Tooltip>
        <Tooltip title='add to list'>
            <IconButton>
                <AddIcon/>
            </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
