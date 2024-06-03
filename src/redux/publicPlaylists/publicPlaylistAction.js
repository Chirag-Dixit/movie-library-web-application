import { SET_PUBLIC_PLAYLIST } from "./publicPlaylistsType"

export const setPublicPlaylist = payload => {
    return{
        type: SET_PUBLIC_PLAYLIST,
        payload
    }
}