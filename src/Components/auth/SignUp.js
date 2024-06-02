import {
  Box,
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const value = collection(database, "Users");

  const signUp = async (e) => {
    try {
      e.preventDefault();
      let data = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = data.user.displayName;
      await updateProfile(auth.currentUser, { displayName: username });
      const userRef = await addDoc(value, { Username: displayName });
      const playlistsRef = doc(collection(userRef, "Playlists"));
      const watchlistsRef = doc(collection(userRef, "Watchlists"));
      await setDoc(playlistsRef, {});
      await setDoc(watchlistsRef, {});
      navigate("/");
    } catch (e) {
      setError(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box textAlign="center" mt={10}>
      <h1
        style={{
          color: "grey",
        }}
      >
        Library of Movies
      </h1>

      <Box textAlign="center" mt={5} component="form" onSubmit={signUp}>
        <p
          style={{
            fontSize: "25px",
          }}
        >
          Sign Up
        </p>
        <p
          style={{
            color: "grey",
          }}
        >
          Already Have an Account? <Link to="/">Login</Link>
        </p>
        <Stack direction="column" spacing={2} mb={2} alignItems="center">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            required
            size="small"
            sx={{
              width: "350px",
            }}
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email Address"
            variant="outlined"
            required
            size="small"
            sx={{
              width: "350px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            variant="outlined"
            required
            size="small"
            sx={{
              width: "350px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!error ? (
            ""
          ) : (
            <Stack direction="row" spacing={1}>
              <ErrorOutlineIcon />
              <Typography variant="subtitle1" color="red">
                User Already Exists
              </Typography>
            </Stack>
          )}

          <Button
            type="submit"
            variant="contained"
            disableRipple
            sx={{
              width: "350px",
            }}
          >
            Sign Up
          </Button>
        </Stack>

        <Link to="/">&lt;&lt;Back to Home Page</Link>
      </Box>
    </Box>
  );
};

export default SignUp;
