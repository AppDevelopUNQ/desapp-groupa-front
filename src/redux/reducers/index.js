import { combineReducers } from "redux";
import localidades from "./localidades";
import projects from "./projects";
import user from "./user";

const rootReducer = combineReducers({
  localidades,
  projects,
  user,
});

export default rootReducer;
