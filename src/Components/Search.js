import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import SearchResult from "./SearchResult";
import { connect } from "react-redux";
import { setPageNumber } from "../redux";

const Search = (props) => {
  const {currentPage, setPageNumber} = props

  const increase = () => {
    setPageNumber(1);
  }

  const decrease = () => {
    if(currentPage != 1){
      setPageNumber(-1)
    }
  }

  return (
    <Stack margin={2} spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography
          variant="h4"
          textAlign={"left"}
          sx={{ textDecoration: "underline" }}
        >
          Results for {props.search}
        </Typography>

        <Stack direction={'row'} spacing={2}>
          <Button onClick={decrease} variant="contained">Prev</Button>
          <Button onClick={increase} variant="contained">Next</Button>
        </Stack>
      </Stack>

      <SearchResult/>
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search.value,
    currentPage: state.pageNumber.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return{
    setPageNumber: data => dispatch(setPageNumber(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
