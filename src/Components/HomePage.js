import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchResult from "./SearchResult";
import UserList from "./UserList";
import WatchList from "./WatchList";
import { connect } from "react-redux";
import { setPopup } from "../redux";
import addMovieToPlaylist from "../utils/addMovieToPlaylist";
import LatestMovies from "./LatestMovies";

const HomePage = (props) => {
  //OMDb API: https://www.omdbapi.com/?i=tt3896198&apikey=790948c6
  //https://www.omdbapi.com/?s=[movieName]&apikey=790948c6

  const { showPopup, setPopup, listItems, parentId, movieData, userData } =
    props;

  const togglePopup = () => {
    setPopup();
  };

  const handleClick = (data) => {
    addMovieToPlaylist(parentId, data.Title, movieData);
    setPopup();
    alert(
      `Movie ${movieData.Title} successfully added to playlist ${data.Title}`
    );
  };

  const playlistNames = listItems.map((element, index) => {
    if (element.Title)
      return (
        <Button
          variant="outlined"
          sx={{
            // border: 'none',
            margin: "10px",
            cursor: "pointer",
            color: "black",
            "&:hover": {
              backgroundColor: "blueviolet",
            },
          }}
          key={index}
          onClick={() => handleClick(element)}
        >
          {element.Title}
        </Button>
      );
  });

  return (
    <Stack spacing={5} m={2}>
      <UserList />

      <WatchList />

      <div className={`App`}>
        {showPopup && <Popup items={playlistNames} closePopup={togglePopup} />}
      </div>
    </Stack>
  );
};

const Popup = ({ closePopup, items }) => {
  const handleClick = () => {
    closePopup();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <Typography variant="h6">Playlists:</Typography>
        {/* <h2>Popup Component</h2> */}
        <div>{items}</div>
        {/* stack of names of playlist */}
        <Button
          onClick={handleClick}
          sx={{
            marginTop: "16px",
          }}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showPopup: state.popup.showPopup,
    listItems: state.listItem.listItems,
    parentId: state.setId.parentId,
    movieData: state.movieData.data,
    userData: state.login.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPopup: () => dispatch(setPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
