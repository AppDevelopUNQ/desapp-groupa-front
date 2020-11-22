import { combineReducers } from "redux";
import projects from "./projects";
import user from "./user";

const rootReducer = combineReducers({
  projects,
  user,
});

export default rootReducer;
