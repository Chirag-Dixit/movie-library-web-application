import { doc, setDoc } from "firebase/firestore"
import { database } from "../firebase"

const addMovieToWatchlist = async(userId, movie) => {
    const ref = doc(database,  `Users/${userId}/Watchlist/${movie.Title}`)

    const movieData = {
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
    }

    await setDoc(ref, movieData)

    console.log(`Movie ${movie.Title} successfully added to watchlist`)
}

export default addMovieToWatchlist