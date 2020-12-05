import { put, takeLatest } from "redux-saga/effects";
import { LOGIN_COMPLETE, LOGIN_START, LOGIN_ERROR } from "../methods/user";
import axios from "axios";
const BASE_URL = "https://desappunq.herokuapp.com";
const HEADER = {
  "Content-type": "application/json",
};

export function* getDonacionesFor({ payload }) {
  try {
    const results = yield axios({
      url: `${BASE_URL}/user/auth`,
      timeout: 1000,
      headers: HEADER,
      method: "POST",
      data: payload,
    });
    window.localStorage.setItem("idUser", results.data.userId);
    // window.localStorage.setItem("admin", results.data.admin);
    yield put({ type: LOGIN_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: LOGIN_ERROR, error });
  }
}

export function* login() {
  yield takeLatest(LOGIN_START, getDonacionesFor);
}
