import { SEARCH_ALL_LOCALIDADES_START } from "../methods/localidades";

export const searchLocalidadesAction = (payload) => ({
  type: SEARCH_ALL_LOCALIDADES_START,
  payload,
});
