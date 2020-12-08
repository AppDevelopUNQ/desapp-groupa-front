import {
  SEARCH_DONATIONS_COMPLETE,
  SEARCH_DONATIONS_START,
  SEARCH_DONATIONS_ERROR,
  DONACION_COMPLETE,
  DONACION_START,
  DONACION_ERROR,
  LOGIN_START,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
} from "../methods/user";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_DONATIONS_START:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_DONATIONS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        donations: action.results.data,
      };
    case SEARCH_DONATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        donations: [],
      };

    case DONACION_START:
      return {
        ...state,
        isLoading: true,
      };
    case DONACION_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case DONACION_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_COMPLETE:
      action.results.data.admin = true;
      return {
        ...state,
        isLoading: false,
        user: action.results.data,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
}
