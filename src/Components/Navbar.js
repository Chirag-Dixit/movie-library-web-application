import React from "react";
import { Button, Select, Stack, TextField, Tooltip, Zoom } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import MoodIcon from "@mui/icons-material/Mood";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = () => {

  }

  const handleSearch = () => {

  }

  return (
    <Stack
      //   direction={width < 600 ? "column" : "row"}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Tooltip title="Library for Movies!">
        <Button
          sx={{
            color: "black",
          }}
        >
            <LocalMoviesIcon />
        </Button>
      </Tooltip>

      <TextField
        className="searchBar"
        id="outlined-basic"
        label="Search for posts..."
        variant="outlined"
        size="small"
        autoComplete="off"
        value={search}
        onChange={handleChange}
        disabled={location.pathname !== "/"}
        sx={{ flexGrow: 1, maxWidth: 300 }}
      />

      <Button onClick={handleSearch}>
        Search
      </Button>

      <Stack direction="row" spacing={0} alignItems="center">
        <Link to="/">
          <Button>
            <HomeIcon
              fontSize="medium"
              sx={{
                color: "black",
              }}
            />
          </Button>
        </Link>

      </Stack>
    </Stack>
  );
};

export default Navbar;
