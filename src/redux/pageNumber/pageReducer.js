import { RESET_PAGE_NUMBER, UPDATE_PAGE_NUMBER } from "./pageType"

const initialState = {
    currentPage: 1
}

const pageReducer = (state=initialState, action) => {
    switch(action.type){
        case UPDATE_PAGE_NUMBER: return{
            currentPage: state.currentPage + action.payload
        }

        case RESET_PAGE_NUMBER: return{
            currentPage: 1
        }

        default: return state
    }
}

export default pageReducer