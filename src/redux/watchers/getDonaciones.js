import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_DONATIONS_COMPLETE,
  SEARCH_DONATIONS_START,
  SEARCH_DONATIONS_ERROR,
} from "../methods/user";
import { GET } from "../../controllers/BaseController";

export function* getDonacionesFor({ payload }) {
  try {
    const results = yield call(
      GET,
      `user/${window.localStorage.getItem("idUser")}/donations`,
      null
    );
    yield put({ type: SEARCH_DONATIONS_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_DONATIONS_ERROR, error });
  }
}

export function* getDonaciones() {
  yield takeLatest(SEARCH_DONATIONS_START, getDonacionesFor);
}
