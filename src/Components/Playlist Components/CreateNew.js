import { Button, Card, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";
import { connect } from "react-redux";

const CreateNew = (props) => {
  const { parentId, playlistId } = props;
  // const value = collection(database, "Users", parentId, "Playlists");
  const [clicked, setClicked] = useState(false);

  const handleSubmit = () => {
    // addDoc(collection(value, playlistId, "Movies"), {
    //   Title: "",
    // });
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      {clicked ? (
        <Stack
          spacing={3}
          sx={{
            minHeight: '232px',
            minWidth: "200px",
            border: "1px solid gainsboro",
            alignContent: "center",
            textAlign: "center",
            padding: '8px'
          }}
        >
          <TextField />
          <Button onClick={handleSubmit}>Make new Playlist</Button>
          <Button onClick={handleClick}>Cancel</Button>
        </Stack>
      ) : (
        <Button
          sx={{
            minHeight: '250px',
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

const mapStateToProps = (state) => {
  return {
    parentId: state.setId.parentId,
    playlistId: state.setId.playlistId,
  };
};

export default connect(mapStateToProps, null)(CreateNew);
