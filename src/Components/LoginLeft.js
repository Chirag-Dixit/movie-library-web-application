import { Typography } from "@mui/material";
import React from "react";
import Typewriter from "typewriter-effect";

const LoginLeft = () => {
  return (
    <Typography variant="h5">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome!")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Please Login to continue!")
            .start();
        }}
      />
    </Typography>
  );
};

export default LoginLeft;
