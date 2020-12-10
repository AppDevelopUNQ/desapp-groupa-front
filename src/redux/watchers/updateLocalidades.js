import { put, call, takeLatest } from "redux-saga/effects";
import {
  UPDATE_LOCALIDADES_COMPLETE,
  UPDATE_LOCALIDADES_START,
  UPDATE_LOCALIDADES_ERROR,
} from "../methods/localidades";
import { PUT } from "../../controllers/BaseController";

export function* updateLocalidades({ payload }) {
  try {
    yield call(PUT, `locality/${payload.id}`, payload);
    yield put({ type: UPDATE_LOCALIDADES_COMPLETE });
  } catch (error) {
    console.error(error);
    yield put({ type: UPDATE_LOCALIDADES_ERROR, error });
  }
}

export function* updateLocalidadesBase() {
  yield takeLatest(UPDATE_LOCALIDADES_START, updateLocalidades);
}
