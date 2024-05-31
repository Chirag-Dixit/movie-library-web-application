import { SET_PLAYLIST_ID, SET_USER_ID } from "./setIdType"

export const setParent = payload =>{
    return{
        type: SET_USER_ID,
        payload
    }
}

export const setPlaylist = payload =>{
    return{
        type: SET_PLAYLIST_ID, 
        payload
    }
}