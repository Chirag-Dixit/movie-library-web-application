import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { Stack } from "@mui/material";
import NameCard from "./NameCard";
import { setListItems } from "../../redux/function/funcAction";
import { connect } from "react-redux";
import Loading from '../Loading'

const PlayList = (props) => {
  const { data, setListItems, listItems } = props;
  const value = collection(database, "Users", data?.id, "Playlists");
  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false)
    };

    getData();
  }, []);

  useEffect(() => {
    setListItems(val);
  }, [val]);

  const listOfItems = listItems.map((element, index) => {
    return <NameCard data={element} key={index} />;
  });

  return (
    <Stack direction={"row"} spacing={2}>
      {loading && listOfItems ? <Loading /> : listOfItems}
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    listItems: state.listItem.listItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListItems: (data) => dispatch(setListItems(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
