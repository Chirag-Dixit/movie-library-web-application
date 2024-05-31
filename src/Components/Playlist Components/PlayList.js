import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import Movies from "./Movies";
import { Stack } from "@mui/material";
import NameCard from "./NameCard";

const PlayList = (props) => {
  const { data } = props;
  const value = collection(database, "Users", data?.id, "Playlists");
  const [val, setVal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const list = val.map((element, index) => {
    return <Movies parentId={data?.id} data={element} key={index} />;
  });

  console.log(list)

  const list_names = val.map((element, index)=>{
    return <NameCard data={element} key={index}/>
  })

  console.log(list_names)

  return <Stack>{list_names}</Stack>;
};

export default PlayList;
