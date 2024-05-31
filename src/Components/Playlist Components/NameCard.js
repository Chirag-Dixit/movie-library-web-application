import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setPlaylist } from "../../redux/collectionIDs/setIdAction";
import { connect } from "react-redux";

const NameCard = (props) => {
  const navigate = useNavigate();
  const { setPlaylist, data } = props;

  const handleClick = () => {
    const obj = {
      name: data.Title,
      id: data.id,
    };
    setPlaylist(obj);
    navigate(`/playlist/${data.Title}`);
  };

  return (
    <button
      style={{
        minHeight: "250px",
        minWidth: "250px",
        border: "1px solid gainsboro",
        textAlign: "center",
        alignItems: "center",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Link
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <h4>{data.Title}</h4>
      </Link>
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (data) => dispatch(setPlaylist(data)),
  };
};

export default connect(null, mapDispatchToProps)(NameCard);
