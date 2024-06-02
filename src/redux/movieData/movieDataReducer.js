import { SET_MOVIE_DATA } from "./movieDataType"

const initialState = {
    data: {}
}

const movieDataReducer = (state=initialState, action) =>{
    switch(action.type){
        case SET_MOVIE_DATA: return{
            data: action.payload
        }

        default: return state
    }
}

export default movieDataReducer