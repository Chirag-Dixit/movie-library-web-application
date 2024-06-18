import { Button, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";
import Loading from "./Loading";
import addMovieToPlaylist from "../utils/addMovieToPlaylist";
import { setPopup } from "../redux";

const SearchResult = (props) => {
  const { showPopup, setPopup, listItems, parentId, movieData, currentPage } =
    props;
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(true);

  const togglePopup = () => {
    setPopup();
  };

  const handleClick = (data) => {
    addMovieToPlaylist(parentId, data.Title, movieData);
    setPopup();
    alert(
      `Movie ${movieData.Title} successfully added to playlist ${data.Title}`
    );
  };

  useEffect(() => {
    const getMovieData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://www.omdbapi.com/?s=${props.search}&type=movie&page=${currentPage}&apikey=790948c6`
      );
      const movies = await data.json();
      setTemp(movies.Search);
      setLoading(false);
    };

    getMovieData();
  }, [props.search, currentPage]);

  const moviesList = temp?.map((element, index) => {
    return <MovieCard data={element} key={index} />;
  });

  const playlistNames = listItems.map((element, index) => {
    if (element.Title)
      return (
        <Button
          variant="outlined"
          sx={{
            margin: "10px",
            cursor: "pointer",
            color: "black",
            "&:hover": {
              backgroundColor: "blueviolet",
            },
          }}
          key={index}
          onClick={() => handleClick(element)}
        >
          {element.Title}
        </Button>
      );
  });

  return (
    <>
      {temp === undefined ? (
        <Typography variant="h4" textAlign={"left"}>
          No movie found. Please Enter a valid movie name.
        </Typography>
      ) : (
        <Stack
          direction={"row"}
          sx={{
            width: "fit-content",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            alignItems: "center",
            gap: "30px",
            "@media (max-width: 768px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 480px)": {
              gridTemplateColumns: "1fr",
              gap: "15px", 
            },
          }}
        >
          {loading ? <Loading /> : moviesList}
          <div className={`App`}>
            {showPopup && (
              <Popup items={playlistNames} closePopup={togglePopup} />
            )}
          </div>
        </Stack>
      )}
    </>
  );
};

const Popup = ({ closePopup, items }) => {
  const handleClick = () => {
    closePopup();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <Typography variant="h6">Playlists:</Typography>
        <div>{items}</div>
        <Button
          onClick={handleClick}
          sx={{
            marginTop: "16px",
          }}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search.value,
    listItems: state.listItem.listItems,
    parentId: state.setId.parentId,
    showPopup: state.popup.showPopup,
    movieData: state.movieData.data,
    currentPage: state.pageNumber.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPopup: () => dispatch(setPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
