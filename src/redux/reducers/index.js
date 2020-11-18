import { combineReducers } from "redux";
import login from "./login";
import projects from "./projects";
import user from "./user";

const rootReducer = combineReducers({
  login,
  projects,
  user,
});

export default rootReducer;
