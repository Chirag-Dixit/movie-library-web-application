import { Stack, Typography } from "@mui/material";
import React from "react";
import SearchResult from "./SearchResult";
import { connect } from "react-redux";

const Search = (props) => {
  return (
    <Stack margin={2} spacing={2}>
      <Typography
        variant="h4"
        textAlign={"left"}
        sx={{ textDecoration: "underline" }}
      >
        Results for {props.search}
      </Typography>

      <SearchResult />
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search.value,
  };
};

export default connect(mapStateToProps, null)(Search);
