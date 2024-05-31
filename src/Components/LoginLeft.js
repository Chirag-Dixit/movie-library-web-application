import React from "react";
import Typewriter from "typewriter-effect";

const LoginLeft = () => {
  return (
    <div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Please Login to continue")
            .start();
        }}
      />
    </div>
  );
};

export default LoginLeft;
