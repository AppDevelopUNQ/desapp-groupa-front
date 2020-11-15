import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_MOVIE_COMPLETE,
  SEARCH_MOVIE_START,
  SEARCH_MOVIE_ERROR,
} from "../methods/search";
import { test } from "../../controllers/TestController";

export function* searchMovie({ payload }) {
  try {
    const results = yield call(test, "", { s: payload.nameMovie });
    yield put({ type: SEARCH_MOVIE_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_MOVIE_ERROR, error });
  }
}

export default function* search() {
  yield takeLatest(SEARCH_MOVIE_START, searchMovie);
}
