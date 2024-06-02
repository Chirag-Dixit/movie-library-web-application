import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchResult from "./SearchResult";
import UserList from "./UserList";
import WatchList from "./WatchList";
import { connect } from "react-redux";
import { setPopup } from "../redux";
import addMovieToPlaylist from "../utils/addMovieToPlaylist";

const HomePage = (props) => {
  //OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=790948c6
  //http://www.omdbapi.com/?s=[movieName]&apikey=790948c6

  const { showPopup, setPopup, listItems, parentId, movieData } = props;

  // console.log(movieData)

  const togglePopup = () => {
    setPopup();
  };

  const handleClick = (data) => {
    addMovieToPlaylist(parentId, data.Title, movieData)
    setPopup()
    alert(`Movie ${movieData.Title} successfully added to playlist ${data.Title}`)
  }

  const playlistNames = listItems.map((element, index) => {
    return (
      <button
        style={{
          // border: 'none',
          margin: '10px',
          cursor: 'pointer'
        }}

        key={index}
        onClick={() => handleClick(element)}
      >
        {element.Title}
      </button>
    );
  });

  return (
    <Stack spacing={5}>
      <Stack textAlign={"left"} spacing={2}>
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
          }}
        >
          Your(User's) Playlist of Movies
        </Typography>
        <UserList />
      </Stack>

      <Stack textAlign={"left"} spacing={2}>
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
          }}
        >
          Your Watchlist
        </Typography>
        <WatchList />
      </Stack>

      <div className={`App`}>
        {showPopup && <Popup items={playlistNames} closePopup={togglePopup} />}
      </div>

      {/* {playlistNames} */}
    </Stack>
  );
};

const Popup = ({ closePopup, items }) => {
  const handleClick = () => {
    closePopup();
  };

  console.log(items);
  return (
    <div className="popup">
      <div className="popup-content">
        {/* <h2>Popup Component</h2> */}
        <div >
          {items}
        </div>
        {/* stack of names of playlist */}
        <button
          onClick={handleClick}
          style={{
            marginTop: "16px",
          }}
        >
          Cancel
        </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPopup: () => dispatch(setPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
