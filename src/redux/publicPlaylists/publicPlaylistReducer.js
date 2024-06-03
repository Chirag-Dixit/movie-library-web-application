import { SET_PUBLIC_PLAYLIST } from "./publicPlaylistsType"

const initialState = {
    playlists: []
}

const publicPlaylistReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_PUBLIC_PLAYLIST: return{
            playlists: action.payload
        }

        default: return state
    }
}

export default publicPlaylistReducer