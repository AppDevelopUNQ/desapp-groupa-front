import { SEARCH_ALL_PROJECTS_START } from "../methods/projects";

export const search = (payload) => ({
  type: SEARCH_ALL_PROJECTS_START,
  payload,
});
