import { put, call, takeLatest, delay } from "redux-saga/effects";
import { POST } from "../../controllers/BaseController";
import {
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
} from "../methods/user";
import { filterProject } from "./filterProjectBase";
import { getDonacionesFor } from "./getDonaciones";
export function* donacion({ payload }) {
  try {
    yield call(POST, `user/${39}/donate`, {
      projectId: payload.donacion.idProyecto,
      amount: payload.donacion.amount,
    });

    yield delay(700);

    yield call(getDonacionesFor, payload);

    yield call(filterProject, {
      word: payload.search.word,
      date: payload.search.date,
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
