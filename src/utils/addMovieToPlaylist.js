import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "../firebase";

const addMovieToPlaylist = async (userId, playlistId, movie) => {
//   const movieRef = database
//     .collection("Users")
//     .doc(userId)
//     .collection("Playlists")
//     .doc(playlistId)
//     .collection("Movies")
//     .doc();

    const movieRef = doc(database, `Users/${userId}/Playlists/${playlistId}/Movies/${movie.Title}`)

  const movieData = {
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
  };

  await setDoc(movieRef, movieData)

  console.log(`Movie ${movie.Title} added successfully to ${playlistId}`);
};

export default addMovieToPlaylist;
