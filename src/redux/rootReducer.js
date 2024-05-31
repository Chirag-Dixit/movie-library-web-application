import { combineReducers } from "redux";
import loginReducer from "./login/loginReducer";
import searchReducer from "./Search/searchReducer";
import setIdReducer from "./collectionIDs/setIdReducer";

const rootReducer = combineReducers({
    login: loginReducer, 
    search: searchReducer,
    setId: setIdReducer
})

export default rootReducer
