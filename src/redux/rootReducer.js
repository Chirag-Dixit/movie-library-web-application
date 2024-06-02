import { combineReducers } from "redux";
import loginReducer from "./login/loginReducer";
import searchReducer from "./Search/searchReducer";
import setIdReducer from "./collectionIDs/setIdReducer";
import listItemReducer from './function/funcReducer'
import popupReducer from './popup/popupReducer'
import movieDataReducer from "./movieData/movieDataReducer";
import pageReducer from "./pageNumber/pageReducer";

const rootReducer = combineReducers({
    login: loginReducer, 
    search: searchReducer,
    setId: setIdReducer,
    listItem: listItemReducer,
    popup: popupReducer,
    movieData: movieDataReducer,
    pageNumber: pageReducer
})

export default rootReducer