import { Button, Card, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";
import { connect } from "react-redux";
import { addNewPlaylist } from "../../utils/addNewPlaylist";
import { updateListItems } from "../../redux";

const CreateNew = (props) => {
  const { parentId, playlistId, updateListItems } = props;
  const [playlistTitle, setPlaylistTitle] = useState("");
  // const value = collection(database, "Users", parentId, "Playlists");
  const [clicked, setClicked] = useState(false);

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

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      {clicked ? (
        // <Stack
        //   spacing={3}
        //   sx={{
        //     minHeight: "232px",
        //     minWidth: "200px",
        //     border: "1px solid gainsboro",
        //     alignContent: "center",
        //     textAlign: "center",
        //     padding: "8px",
        //   }}
        // >
        //   <TextField
        //     value={playlistTitle}
        //     onChange={(e) => setPlaylistTitle(e.target.value)}
        //   />
        //   <Button onClick={handleSubmit}>Make new Playlist</Button>
        //   <Button onClick={handleClick}>Cancel</Button>
        // </Stack>
        <PlaylistPopup playlistTitle={playlistTitle} handleClick={handleClick} handleSubmit={handleSubmit} setPlaylistTitle={setPlaylistTitle}/>
      ) : (
        <Button
          sx={{
            minHeight: "250px",
            minWidth: "250px",
            border: "1px solid gainsboro",
            alignContent: "center",
            textAlign: "center",
          }}
          onClick={handleClick}
        >
          <AddIcon
            sx={{
              height: "50px",
              width: "50px",
            }}
          />
        </Button>
      )}
    </div>
  );
};

const PlaylistPopup = ({ playlistTitle, handleClick, handleSubmit, setPlaylistTitle }) => {
  return (
    <div className="popup" style={{
      padding: '10px',
    }}>
      <Stack
        spacing={3}
        sx={{
          minHeight: "232px",
          minWidth: "200px",
          border: "1px solid gainsboro",
          alignContent: "center",
          textAlign: "center",
          padding: "16px",
          height: '20px'
        }}
        className="popup-content"
      >
        <TextField
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          placeholder="Enter playlist name..."
        />
        <Button variant="outlined" onClick={handleSubmit}>Make new Playlist</Button>
        <Button variant="outlined" onClick={handleClick}>Cancel</Button>
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    parentId: state.setId.parentId,
    playlistId: state.setId.playlistId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { updateListItems: (data) => dispatch(updateListItems(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew);
