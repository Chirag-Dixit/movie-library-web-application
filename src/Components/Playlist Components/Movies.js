import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import MovieCard from "../MovieCard";
import { Stack } from "@mui/material";
import { connect } from "react-redux";
import Loading from "../Loading"

const Movies = (props) => {
  const { parentId, playlistId, playlistName, userId } = props;
  const pId = userId == undefined? parentId : userId
  const value = collection(
    database,
    "Users",
    pId,
    "Playlists",
    playlistId,
    "Movies"
  );
  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getData();
  }, []);

  const list = val.map((element, index) => {
    return <MovieCard inPlaylist={true} data={element} key={index} />;
  });

  return (
    <>
    
    {
      loading?(<Loading />) :(
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
    </Stack>)
    }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    parentId: state.setId.parentId,
    playlistId: state.setId.playlistId,
    playlistName: state.setId.playlistName,
    userId: state.setId.userId
  };
};

export default connect(mapStateToProps, null)(Movies);
