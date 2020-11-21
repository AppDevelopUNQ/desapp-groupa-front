import { put, call, takeLatest } from "redux-saga/effects";
import {
  LOGIN_USER_COMPLETE,
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
} from "../methods/login";
import { POST } from "../../controllers/BaseController";
import { login } from "../../controllers/UserController";
import { SAVE } from "../../controllers/LocalStorageController";

export function* loginUser({ payload }) {
  try {
    const user = yield call(POST, "user/login", {
      email: payload.mail,
      password: payload.password,
    });

    // const user = yield call(login, {
    //   mail: payload.mail,
    //   password: payload.password,
    // });
    const results = { data: user.data };
    SAVE("userLoged", results.data);
    yield put({ type: LOGIN_USER_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: LOGIN_USER_ERROR, error });
  }
}

export default function* logUser() {
  yield takeLatest(LOGIN_USER_START, loginUser);
}
