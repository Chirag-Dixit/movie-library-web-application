import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setPublicPlaylist } from "../redux";
import fetchNonPrivatePlaylists from "../utils/fetchNonPrivatePlaylists";
import NameCard from "./Playlist Components/NameCard";
import Loading from "./Loading";
import { Stack, Typography } from "@mui/material";

const PublicPlaylists = (props) => {
  const { playlists, setPublicPlaylist } = props;
  const scrollContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylists = async () => {
      const data = await fetchNonPrivatePlaylists();
      setPublicPlaylist(data);
      setLoading(false);
    };

    getPlaylists();
  }, []);

  const list = playlists.map((element, index) => {
    return <NameCard publicPlaylist={true} data={element} key={index} />;
  });

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };


  return (
    <Stack spacing={2} minHeight={"200px"}>
      <Stack direction={"row"} spacing={4}>
      <Typography
        variant="h5"
        textAlign={"left"}
        sx={{
          textDecoration: "underline",
        }}
      >
        Public Playlists
      </Typography>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          borderRadius: "30%",
          alignItems: "center",
          textAlign: "center",
        }}
        onClick={scrollLeft}
      >
        &#9664;
      </button>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          borderRadius: "30%",
          alignItems: "center",
          textAlign: "center",
        }}
        onClick={scrollRight}
      >
        &#9654;
      </button>
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <Stack direction="row" spacing={2} ref={scrollContainerRef}
        sx={{
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}>
          {list}
        </Stack>
      )}
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    playlists: state.publicPlaylist.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPublicPlaylist: (data) => dispatch(setPublicPlaylist(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
