import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "../firebase";

export const addNewPlaylist = async (userId, playlistTitle) => {
  const userPlaylistsRef = doc(
    database,
    `Users/${userId}/Playlists/${playlistTitle}`
  );

  const newPlaylist = {
    Title: playlistTitle,
  };

  await setDoc(userPlaylistsRef, newPlaylist);

  const moviesCollectionRef = collection(userPlaylistsRef, "Movies");

  await setDoc(doc(moviesCollectionRef), {});

  console.log(`playlist ${playlistTitle} added successfully`);
};
