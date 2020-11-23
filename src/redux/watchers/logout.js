import { put, call, takeLatest } from "redux-saga/effects";
import {
  LOGOUT_USER_COMPLETE,
  LOGOUT_USER_START,
  LOGOUT_USER_ERROR,
} from "../methods/login";
import { DELETE } from "../../controllers/LocalStorageController";

export function* logoutUser({ payload }) {
  try {
    DELETE("userLoged");
    yield put({ type: LOGOUT_USER_COMPLETE });
  } catch (error) {
    console.error(error);
    yield put({ type: LOGOUT_USER_ERROR, error });
  }
}

export default function* logout() {
  yield takeLatest(LOGOUT_USER_START, logoutUser);
}
