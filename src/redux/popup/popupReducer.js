import { SET_POP_UP } from "./popupType"

const initialState = {
    showPopup: false
}

const popupReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_POP_UP: return{
            showPopup: !state.showPopup
        }

        default: return state
    }
}

export default popupReducer