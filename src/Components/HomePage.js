import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import UserList from "./UserList";
import WatchList from "./WatchList";
import { connect } from "react-redux";
import { setPopup, updateListItems } from "../redux";
import addMovieToPlaylist from "../utils/addMovieToPlaylist";
import { PlaylistPopup } from "./Playlist Components/CreateNew";
import { addNewPlaylist } from "../utils/addNewPlaylist";
import PublicPlaylists from "./PublicPlaylists";

const HomePage = (props) => {
  //OMDb API: https://www.omdbapi.com/?i=tt3896198&apikey=790948c6
  //https://www.omdbapi.com/?s=[movieName]&apikey=790948c6

  const {
    showPopup,
    setPopup,
    listItems,
    parentId,
    movieData,
    userData,
    updateListItems,
  } = props;
  const [clicked, setClicked] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handleSubmit = () => {
    if (playlistTitle.trim()) {
      addNewPlaylist(parentId, playlistTitle);
      setPlaylistTitle("");
      setClicked(!clicked);
      updateListItems({
        Title: playlistTitle,
      });
    } else {
      alert("please enter a playlist title.");
    }
  };

  const handlePlaylistClick = () => {
    setClicked(!clicked);
  };

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

      <PublicPlaylists />

      <div className={`App`}>
        {showPopup && (
          <Popup
            items={playlistNames}
            closePopup={togglePopup}
            handleSubmit={handleSubmit}
            handlePlaylistClick={handlePlaylistClick}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            clicked={clicked}
          />
        )}
      </div>
    </Stack>
  );
};

const Popup = ({
  clicked, 
  closePopup,
  items,
  handleSubmit,
  handlePlaylistClick,
  playlistTitle,
  setPlaylistTitle,
}) => {
  const handleClick = () => {
    closePopup();
  };

  return (
    <div className="popup">
      {clicked ? (
        <PlaylistPopup
          playlistTitle={playlistTitle}
          handleClick={handlePlaylistClick}
          handleSubmit={handleSubmit}
          setPlaylistTitle={setPlaylistTitle}
        />
      ) : (
        <Stack spacing={2} className="popup-content">
          <Typography variant="h6">Playlists:</Typography>
          <Button variant="contained" onClick={handlePlaylistClick}>
            Create Playlist
          </Button>
          <div>{items}</div>
          <Button
            onClick={handleClick}
            sx={{
              marginTop: "16px",
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </Stack>
      )}
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
    updateListItems: (data) => dispatch(updateListItems(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
