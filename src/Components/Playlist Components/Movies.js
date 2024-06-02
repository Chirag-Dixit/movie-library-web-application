import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import MovieCard from "../MovieCard";
import { Stack } from "@mui/material";
import { connect } from "react-redux";

const Movies = (props) => {
  const { parentId, playlistId, playlistName } = props;
  console.log(playlistId);
  const value = collection(
    database,
    "Users",
    parentId,
    "Playlists",
    playlistId,
    "Movies"
  );
  const [val, setVal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const list = val.map((element, index) => {
    return <MovieCard inPlaylist={true} data={element} key={index} />;
  });

  return (
    <Stack spacing={2} m={5}>
      <h3
        style={{
          textAlign: "left",
          textDecoration: "underline",
          marginLeft: '16px'
        }}

      >
        {playlistName}
      </h3>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          width: "fit-content",
          padding: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {list}
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    parentId: state.setId.parentId,
    playlistId: state.setId.playlistId,
    playlistName: state.setId.playlistName,
  };
};

export default connect(mapStateToProps, null)(Movies);
