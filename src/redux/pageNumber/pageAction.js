import { RESET_PAGE_NUMBER, UPDATE_PAGE_NUMBER } from "./pageType"

export const setPageNumber = payload => {
    return{
        type: UPDATE_PAGE_NUMBER,
        payload
    }
}

export const resetPageNumber = () => {
    return{
        type: RESET_PAGE_NUMBER,
    }
}