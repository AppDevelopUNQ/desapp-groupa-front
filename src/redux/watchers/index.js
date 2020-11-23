import { all } from "redux-saga/effects";
import { filterProjectBase } from "./filterProjectBase";
import { getDonaciones } from "./getDonaciones";
import login from "./login";
import donar from "./donar";

export default function* rootSaga() {
  yield all([login(), donar(), getDonaciones(), filterProjectBase()]);
}
