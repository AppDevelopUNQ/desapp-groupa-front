import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_ALL_PROJECTS_COMPLETE,
  SEARCH_ALL_PROJECTS_START,
  SEARCH_ALL_PROJECTS_ERROR,
} from "../methods/projects";
import { PUT } from "../../controllers/BaseController";

export function* filterProject({ payload }) {
  try {
    const results = yield call(PUT, "project/filter", {
      word: payload ? payload.word : "",
      date: payload ? payload.date : "",
    });
    yield put({ type: SEARCH_ALL_PROJECTS_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_ALL_PROJECTS_ERROR, error });
  }
}

export function* filterProjectBase() {
  yield takeLatest(SEARCH_ALL_PROJECTS_START, filterProject);
}
