import {
  SEARCH_ALL_LOCALIDADES_START,
  UPDATE_LOCALIDADES_START,
} from "../methods/localidades";

export const searchLocalidadesAction = (payload) => ({
  type: SEARCH_ALL_LOCALIDADES_START,
  payload,
});

export const updateLocalidad = (payload) => ({
  type: UPDATE_LOCALIDADES_START,
  payload,
});
