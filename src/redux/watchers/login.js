import { put, call, takeLatest } from "redux-saga/effects";
import { LOGIN_COMPLETE, LOGIN_START, LOGIN_ERROR } from "../methods/user";
import { POST } from "../../controllers/BaseController";

export function* getDonacionesFor({ payload }) {
  try {
    const results = yield call(POST, `user`, payload);
    yield put({ type: LOGIN_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: LOGIN_ERROR, error });
  }
}

export default function* login() {
  yield takeLatest(LOGIN_START, getDonacionesFor);
}
