import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import SearchResult from "./SearchResult";
import UserList from "./UserList";
import WatchList from "./WatchList";

const HomePage = () => {
  //OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=790948c6
  //http://www.omdbapi.com/?s=[movieName]&apikey=790948c6

  return (
    <Stack spacing={5}>
      {/* Navbar - Logo, SearchBar + button, profile button
      --space for searched movies here--
      User's list of movie lists created */}

      <Stack textAlign={'left'} spacing={2}>
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
      
      <Stack textAlign={'left'} spacing={2}>
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
    </Stack>
  );
};

export default HomePage;
