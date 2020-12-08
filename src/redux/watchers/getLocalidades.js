import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_ALL_LOCALIDADES_COMPLETE,
  SEARCH_ALL_LOCALIDADES_START,
  SEARCH_ALL_LOCALIDADES_ERROR,
} from "../methods/localidades";
import { GET } from "../../controllers/BaseController";

export function* filterLocalidades({ payload }) {
  try {
    const results = yield call(GET, "locality/list");
    yield put({ type: SEARCH_ALL_LOCALIDADES_COMPLETE, results });
  } catch (error) {
    console.error(error);
    yield put({ type: SEARCH_ALL_LOCALIDADES_ERROR, error });
  }
}

export function* filterLocalidadesBase() {
  yield takeLatest(SEARCH_ALL_LOCALIDADES_START, filterLocalidades);
}
