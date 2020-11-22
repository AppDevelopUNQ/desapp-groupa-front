import { put, call, takeLatest } from "redux-saga/effects";
import {
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
  SEARCH_DONATIONS_START,
} from "../methods/user";
import { POST } from "../../controllers/BaseController";
import { SEARCH_ALL_PROJECTS_START } from "../methods/projects";

export function* donacion({ payload }) {
  try {
    //GENERAR DONACION
    let donation = yield call(POST, `user/${39}/donate`, {
      projectId: payload.donacion.idProyecto,
      amount: payload.donacion.amount,
    });

    // //ACTUALIZAR DATOS DE LOS PROYECTOS
    // yield put({
    //   type: SEARCH_ALL_PROJECTS_START,
    //   payload: {
    //     word: payload && payload.search ? payload.search.word : "",
    //     date: payload && payload.search ? payload.search.date : "",
    //   },
    // });

    // //ACTUALIZAR DONACIONES DEL USUARIO
    // yield put({ type: SEARCH_DONATIONS_START });

    yield put({ type: DONACION_COMPLETE });
  } catch (error) {
    console.error(error);
    yield put({ type: DONACION_ERROR, error });
  }
}

export default function* donar() {
  yield takeLatest(DONACION_START, donacion);
}
