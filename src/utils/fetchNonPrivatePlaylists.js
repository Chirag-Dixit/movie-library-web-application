import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";

const fetchNonPrivatePlaylists = async () => {
  const usersCollection = collection(database, "Users");
  const usersSnapshot = await getDocs(usersCollection);

  let playlists = [];

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id
    const playlistsCollection = collection(userDoc.ref, 'Playlists');
    const q = query(playlistsCollection, where('private', '==', false));
    const playlistsSnapshot = await getDocs(q);

    playlistsSnapshot.forEach((playlistDoc) => {
      playlists.push({
        id: playlistDoc.id,
        ...playlistDoc.data(),
        username: userDoc.data().Username,
        userId: userId
      });
    });
  }

  return playlists;
};

export default fetchNonPrivatePlaylists;
