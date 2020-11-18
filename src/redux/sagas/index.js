import { all } from "redux-saga/effects";
import login from "./login";
import logout from "./logout";
import projects from "./projects";
import user from "./user";

export default function* rootSaga() {
  yield all([login(), logout(), user(), projects()]);
}
