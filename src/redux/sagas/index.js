import { all } from "redux-saga/effects";
import login from "./login";
import logout from "./logout";
import projects from "./projects";
import search from "./search";

export default function* rootSaga() {
  yield all([search(), login(),logout(), projects()]);
}
