import { get } from "lodash";

export const isLoading = (state) => get(state, "localidades.isLoading");
export const getAllLocalidades = (state) =>
  get(state, "localidades.allLocalidades");
