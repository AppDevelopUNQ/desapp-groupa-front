import {
  SEARCH_ALL_PROJECTS_COMPLETE,
  SEARCH_ALL_PROJECTS_START,
  SEARCH_ALL_PROJECTS_ERROR,
} from "../methods/projects";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALL_PROJECTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_ALL_PROJECTS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        allProjects: action.results.data,
      };
    case SEARCH_ALL_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        allProjects: [],
      };
    default:
      return {
        ...state,
      };
  }
}
