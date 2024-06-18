import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import Movies from "./Components/Playlist Components/Movies";

function App() {
  const location = useLocation();

  return (
    <div
      className="App"
    >
      {location.pathname == "/" || location.pathname === "/signup" ? (
        ""
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="homepage" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="search" element={<Search />} />
        <Route path="playlist/:playlistName" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
