import {
  FINALIZAR_PROYECTO_START,
  SEARCH_ALL_PROJECTS_START,
} from "../methods/projects";

export const search = (payload) => ({
  type: SEARCH_ALL_PROJECTS_START,
  payload,
});

export const finalizar = (payload) => ({
  type: FINALIZAR_PROYECTO_START,
  payload,
});
