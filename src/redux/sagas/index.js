import { all } from "redux-saga/effects";
import projects from "./projects";
import user from "./user";
import donar from "./donar";

export default function* rootSaga() {
  yield all([user(), donar(), projects()]);
}
