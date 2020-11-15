import { get } from "lodash";

export const isLoading = (state) => get(state, "projects.isLoading");
export const getAllProjects = (state) => get(state, "projects.allProjects");
