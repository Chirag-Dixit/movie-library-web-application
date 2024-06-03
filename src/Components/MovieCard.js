import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";
import { setMovieData, setPopup } from "../redux";
import addMovieToWatchlist from "../utils/addMovieToWatchlist";

const MovieCard = (props) => {
  const {
    data,
    setPopup,
    setMovieData,
    parentId,
    inPlaylist,
  } = props;
  const obj = {
    Title: data.Title,
    Year: data.Year,
    Poster: data.Poster,
  };

  const [clicked, setClicked] = useState(false)

  const handleWatchlistAdd = () => {
    addMovieToWatchlist(parentId, obj);
    setClicked(true)
  };

  const handleClick = () => {
    setMovieData(obj);
    setPopup();
  };

  return (
    <>
      {data.Title && (
        <Card
          sx={{
            minWidth: "250px",
            border: "1px solid gainsboro",
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
            <Tooltip title="Add to Watchlist">
              <Button onClick={handleWatchlistAdd} sx={{
                color: clicked ? "red" : "lightblue"
              }}>
                <FavoriteIcon />
              </Button>
            </Tooltip>
            {!inPlaylist && (
              <Tooltip title="add to playlist">
                <Button onClick={handleClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Button>
              </Tooltip>
            )}
          </CardActions>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    parentId: state.setId.parentId,
    movieData: state.movieData.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPopup: () => dispatch(setPopup()),
    setMovieData: (data) => dispatch(setMovieData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
