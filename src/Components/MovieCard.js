import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
  tooltipClasses 
} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddIcon from "@mui/icons-material/Add";

const MovieCard = (props) => {
  const { data } = props;

  console.log(data)
  return (
    <Card
      sx={{
        minWidth: "250px",
        border: '1px solid gainsboro'
      }}
    >
      <CardHeader
        sx={{
          overflow: "hidden",
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },
          cursor: "pointer",
        }}
        title={data?.Title}
        titleTypographyProps={{ noWrap: true }}
        subheader={data?.Year}
        action={
          <IconButton>
            <BookmarkAddIcon />
          </IconButton>
        }
      />
      <Tooltip
        title={data?.Title}
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                {
                  marginTop: "0px",
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                {
                  marginBottom: "0px",
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                {
                  marginLeft: "0px",
                },
              [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                {
                  marginRight: "0px",
                },
            },
          },
        }}
      >
        <CardMedia
          component="img"
          height={"300px"}
          image={data?.Poster}
          alt="N/A"
        />
      </Tooltip>

      <CardActions
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="add to favourites">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="add to list">
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
