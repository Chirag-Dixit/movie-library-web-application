import { SET_PLAYLIST_ID, SET_USER_ID } from "./setIdType"

const initialState = {
    parentId: '',
    playlistId: '', 
    playlistName: '',
    userId: ''
}

const setIdReducer = (state=initialState, action) =>{
    switch(action.type){
        case SET_USER_ID: return{
            ...state,
            parentId: action.payload
        }

        case SET_PLAYLIST_ID: return{
            ...state,
            playlistId: action.payload.id,
            playlistName: action.payload.name,
            userId: action.payload.userId
        }

        default: return state
    }
}

export default setIdReducer