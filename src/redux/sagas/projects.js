import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_ALL_PROJECTS_COMPLETE,
  SEARCH_ALL_PROJECTS_START,
  SEARCH_ALL_PROJECTS_ERROR,
} from "../methods/projects";
import { GET } from "../../controllers/BaseController";

export function* loginUser({ payload }) {
  try {
    const results = yield call(GET, "/project/list", "");
    yield put({ type: SEARCH_ALL_PROJECTS_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_ALL_PROJECTS_ERROR, error });
  }
}

export default function* logUser() {
  yield takeLatest(SEARCH_ALL_PROJECTS_START, loginUser);
}
