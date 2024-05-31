import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Stack } from "@mui/material";
import CreateNew from "./Playlist Components/CreateNew";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import PlayList from "./Playlist Components/PlayList";
import { connect } from "react-redux";
import { setParent } from "../redux/collectionIDs/setIdAction";

const UserList = (props) => {
  const {userData, setParent} = props
  const value = collection(database, "Users");
  const [val, setVal] = useState([]);
  const [val2, setVal2] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);


  const movies = val.map((element, index) => {
    if(userData?.displayName == element.Username){
      setParent(element.id)
      return <PlayList data={element} key={index}/>
    }
  });

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        overflow: "auto",
      }}
    >
      <CreateNew />
      {/* yaha par playlist aayengi */}
      {movies}
    </Stack>
  );
};

const mapStateToProps = state =>{
  return{
    userData: state.login.userData,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    setParent: (data) => dispatch(setParent(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
