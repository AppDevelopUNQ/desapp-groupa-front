import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_DONATIONS_COMPLETE,
  SEARCH_DONATIONS_START,
  SEARCH_DONATIONS_ERROR,
} from "../methods/user";
import { TEST_DONA } from "../../controllers/BaseController";

export function* getDonacionesFor({ payload }) {
  try {
    // const results = yield call(GET, "user/donations", {idUsuario: payload});
    const results = yield call(TEST_DONA, { idUsuario: payload });
    yield put({ type: SEARCH_DONATIONS_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_DONATIONS_ERROR, error });
  }
}

export default function* getDonaciones() {
  yield takeLatest(SEARCH_DONATIONS_START, getDonacionesFor);
}
