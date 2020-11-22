import { put, call, takeLatest } from "redux-saga/effects";
import {
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
} from "../methods/user";
import { POST } from "../../controllers/BaseController";

export function* donacion({ payload }) {
  try {
    let donation = yield call(POST, `user/${39}/donate`, {
      projectId: payload.idProyecto,
      amount: payload.amount,
    });
    yield put({ type: DONACION_COMPLETE });
  } catch (error) {
    console.error(error);
    yield put({ type: DONACION_ERROR, error });
  }
}

export default function* donar() {
  yield takeLatest(DONACION_START, donacion);
}
