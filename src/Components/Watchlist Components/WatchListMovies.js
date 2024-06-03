import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import MovieCard from "../MovieCard";
import { Stack } from "@mui/material";
import Loading from "../Loading";

const WatchListMovies = (props) => {
  const { data, inWatchlist } = props;
  const value = collection(database, "Users", data.id, "Watchlist");
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

  const movies = val.map((element, index) => {
    return <MovieCard data={element} key={index} />;
  });

  return <Stack spacing={2} direction={'row'}>{loading? <Loading />:movies}</Stack>;
};

export default WatchListMovies;
