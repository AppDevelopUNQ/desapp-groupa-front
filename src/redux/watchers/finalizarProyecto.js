import { put, call, takeLatest } from "redux-saga/effects";
import {
  FINALIZAR_PROYECTO_COMPLETE,
  FINALIZAR_PROYECTO_START,
  FINALIZAR_PROYECTO_ERROR,
} from "../methods/projects";
import { PUT } from "../../controllers/BaseController";

export function* finalizarProyecto({ payload }) {
  try {
    yield call(
      PUT,
      `project/close/${window.localStorage.getItem("idUser")}/${
        payload.idProyecto
      }`
    );
    const results = yield call(PUT, "project/filter", { word: "", date: "" });
    yield put({ type: FINALIZAR_PROYECTO_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: FINALIZAR_PROYECTO_ERROR, error });
  }
}

export function* finalizarProyectoBase() {
  yield takeLatest(FINALIZAR_PROYECTO_START, finalizarProyecto);
}
