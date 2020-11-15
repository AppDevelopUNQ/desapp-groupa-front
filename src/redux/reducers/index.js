import { combineReducers } from "redux";
import search from "./search";
import login from "./login";
import projects from "./projects";

const rootReducer = combineReducers({
  login,
  search,
  projects,
});

export default rootReducer;
