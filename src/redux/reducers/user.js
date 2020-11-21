import {
  SEARCH_DONATIONS_COMPLETE,
  SEARCH_DONATIONS_START,
  SEARCH_DONATIONS_ERROR,
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
} from "../methods/user";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_DONATIONS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case SEARCH_DONATIONS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        donations: action.results.data,
      };
      break;
    case SEARCH_DONATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        donations: [],
      };
      break;

    case DONACION_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case DONACION_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
      break;
    case DONACION_ERROR:
      return {
        ...state,
        isLoading: false,
      };
      break;

    default:
      return {
        ...state,
      };
  }
}
