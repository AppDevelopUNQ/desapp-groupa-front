import {
  SEARCH_ALL_LOCALIDADES_COMPLETE,
  SEARCH_ALL_LOCALIDADES_START,
  SEARCH_ALL_LOCALIDADES_ERROR,
} from "../methods/localidades";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALL_LOCALIDADES_START:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_ALL_LOCALIDADES_COMPLETE:
      return {
        ...state,
        isLoading: false,
        allLocalidades: action.results.data,
      };
    case SEARCH_ALL_LOCALIDADES_ERROR:
      return {
        ...state,
        isLoading: false,
        allLocalidades: [],
      };
    default:
      return {
        ...state,
      };
  }
}
