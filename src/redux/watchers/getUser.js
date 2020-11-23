import { call, put } from "redux-saga/effects";
import { LOGIN_COMPLETE, LOGIN_ERROR } from "../methods/user";
import { GET } from "../../controllers/BaseController";

export function* getUser() {
  try {
    const results = yield call(
      GET,
      `user/${window.localStorage.getItem("idUser")}`,
      null
    );

    yield put({ type: LOGIN_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: LOGIN_ERROR, error });
  }
}
