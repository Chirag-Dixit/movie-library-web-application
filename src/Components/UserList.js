import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import CreateNew from "./Playlist Components/CreateNew";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import PlayList from "./Playlist Components/PlayList";
import { connect } from "react-redux";
import { setParent } from "../redux/collectionIDs/setIdAction";

const UserList = (props) => {
  const { userData, setParent } = props;
  const value = collection(database, "Users");
  const [val, setVal] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const movies = val.map((element, index) => {
    if (userData?.displayName === element.Username) {
      setParent(element.id);
      return <PlayList data={element} key={index} />;
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
    <Stack textAlign={"left"} spacing={2}>
      <Stack direction={"row"} spacing={4}>
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
          }}
        >
          {userData?.displayName}'s Playlist of Movies
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
      <Stack
        ref={scrollContainerRef}
        direction={"row"}
        spacing={2}
        sx={{
          overflow: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        <CreateNew />
        {movies}
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.login.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParent: (data) => dispatch(setParent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
