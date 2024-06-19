import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setPlaylist } from "../../redux/collectionIDs/setIdAction";
import { connect } from "react-redux";
import LayersIcon from "@mui/icons-material/Layers";
import LockIcon from "@mui/icons-material/Lock";
import { Tooltip, Typography } from "@mui/material";

const NameCard = (props) => {
  const navigate = useNavigate();
  const { setPlaylist, data } = props;

  const handleClick = () => {
    const obj = {
      name: data?.Title,
      id: data?.Title,
      userId: data?.userId
    };
    setPlaylist(obj);
    navigate(`/playlist/${data?.Title}`);
  };

  return (
    <>
      {data?.Title && (
        <button
          style={{
            minHeight: "250px",
            minWidth: "250px",
            border: "1px solid gainsboro",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "whitesmoke",
          }}
          onClick={handleClick}
        >
          {data?.private ? (
            <Tooltip title="Private">
              <LockIcon
                sx={{
                  position: "relative",
                  bottom: "90px",
                  left: "130px",
                }}
              />
            </Tooltip>
          ) : (
            ""
          )}
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <LayersIcon fontSize="large" />
            <h2>{data?.Title}</h2>
            <Typography variant="subtitle">{data?.username}</Typography>
          </Link>
        </button>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (data) => dispatch(setPlaylist(data)),
  };
};

export default connect(null, mapDispatchToProps)(NameCard);
