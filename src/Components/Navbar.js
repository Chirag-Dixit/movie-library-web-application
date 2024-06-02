import React from "react";
import { Button, Select, Stack, TextField, Tooltip, Zoom } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import MoodIcon from "@mui/icons-material/Mood";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { connect } from "react-redux";
import { logout, setSearch } from "../redux";
import { resetPageNumber } from "../redux/pageNumber/pageAction";

const Navbar = (props) => {
  const { isLoggedIn, userData, logout, setSearch, resetPageNumber, currentPage } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = async() => {
    resetPageNumber()
    setSearch(searchVal);
    navigate("/search");
  };

  const handleNavigate = () => {
    navigate("/homepage");
  };

  const handleLogout = () => {
    logout();
    userSignOut();
    navigate("/");
  };

  const userSignOut = async () => {
    await signOut(auth);
  };

  return (
    <Stack
      //   direction={width < 600 ? "column" : "row"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
      mt={2}
    >
      <Tooltip title="Library for Movies!">
        <Button
          sx={{
            color: "black",
          }}
          onClick={handleNavigate}
        >
         Home <LocalMoviesIcon />
        </Button>
      </Tooltip>

      <TextField
        className="searchBar"
        id="outlined-basic"
        label="Search for movies..."
        variant="outlined"
        size="small"
        autoComplete="off"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        sx={{ flexGrow: 1, maxWidth: 300 }}
      />

      <Button variant="contained" onClick={handleSearch}>Search</Button>

      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title={userData?.displayName}>
          <Button>
            <MoodIcon
              fontSize="medium"
              sx={{
                color: "black",
              }}
            />
          </Button>
        </Tooltip>
        <Button onClick={handleLogout}>Logout</Button>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    userData: state.login.userData,
    currentPage: state.pageNumber.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setSearch: (data) => dispatch(setSearch(data)),
    resetPageNumber: () => dispatch(resetPageNumber())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
