import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { connect } from "react-redux";
import WatchListMovies from "./Watchlist Components/WatchListMovies";

const WatchList = (props) => {
  const { userData } = props;
  const [val, setVal] = useState([]);
  const value = collection(database, "Users");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const movieList = val.map((element, index) => {
    if (userData?.displayName === element.Username) {
      return <WatchListMovies data={element} key={index} />;
    }
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
    <Stack textAlign={"left"} spacing={2} minHeight={'200px'}>
      <Stack direction={"row"} spacing={4}>
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
          }}
        >
          Your Watchlist
        </Typography>
        <button style={{
          border: 'none',
          backgroundColor: 'white',
          cursor: 'pointer',
          borderRadius: '30%',
          alignItems: 'center',
          textAlign: 'center'
        }} onClick={scrollLeft}>&#9664;</button>
        <button style={{
          border: 'none',
          backgroundColor: 'white',
          cursor: 'pointer',
          borderRadius: '30%',
          alignItems: 'center',
          textAlign: 'center'
        }} onClick={scrollRight}>&#9654;</button>
      </Stack>
      <div
        ref={scrollContainerRef}
        style={{
          // overflowX: 'hidden',
          // display: 'flex',
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        {movieList}
      </div>
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.login.userData,
  };
};

export default connect(mapStateToProps, null)(WatchList);
