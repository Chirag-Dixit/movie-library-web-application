import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const LatestMovies = () => {
  //make api call
  //data recieved in form of object
  //display data using map
  const [val, setVal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://www.omdbapi.com/?apikey=790948c6&s=2023&type=movie"
      );
      const data = await response.json();
      console.log(data);
      setVal(data.Search);
    };

    getData();
  }, []);

  console.log(val);

  const list = val?.map((element, index) => {
    return <MovieCard data={element} key={index} />;
  });

  return (
    <Stack spacing={2}>
        <Typography variant="h5" sx={{
              textDecoration: "underline",
            }}>Trending Movies</Typography>
      <Stack width={"100px"} direction={"column"} spacing={2}>
        {list}
      </Stack>
    </Stack>
  );
};

export default LatestMovies;
