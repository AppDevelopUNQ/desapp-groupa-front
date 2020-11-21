import { put, call, takeLatest } from "redux-saga/effects";
import {
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
} from "../methods/user";
import { GET } from "../../controllers/LocalStorageController";
import { POST } from "../../controllers/BaseController";

export function* donacion({ payload }) {
  try {
    const usuario = GET("userLoged");
    yield call(POST, `user/${usuario.userId}/donations`, {
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
