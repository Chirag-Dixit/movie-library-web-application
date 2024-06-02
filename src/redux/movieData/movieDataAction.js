import { SET_MOVIE_DATA } from "./movieDataType"

export const setMovieData = payload => {
    return{
        type: SET_MOVIE_DATA,
        payload
    }
}