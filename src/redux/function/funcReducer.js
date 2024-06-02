import { LIST_ITEMS_UPDATE, SET_LIST_ITEMS } from "./funcType"

const initialState = {
    listItems: []
}

const listItemReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LIST_ITEMS: return{
            listItems: action.payload
        }

        case LIST_ITEMS_UPDATE: return{
            listItems: [...state.listItems, action.payload]
        }

        default: return state
    }
}

export default listItemReducer