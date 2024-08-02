import { combineReducers } from "redux";
import { Reducer as Authentication } from "./authentication/reducers";

const rootReducers = combineReducers({
  authentication: Authentication,
});

export default rootReducers;
