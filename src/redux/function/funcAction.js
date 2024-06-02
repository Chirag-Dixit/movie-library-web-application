import { LIST_ITEMS_UPDATE, SET_LIST_ITEMS } from "./funcType"

export const setListItems = payload => {
    return{
        type: SET_LIST_ITEMS,
        payload
    }
}

export const updateListItems = payload => {
    return{
        type: LIST_ITEMS_UPDATE,
        payload
    }
}
