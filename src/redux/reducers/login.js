import {
  LOGIN_USER_COMPLETE,
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
  LOGOUT_USER_COMPLETE,
  LOGOUT_USER_START,
  LOGOUT_USER_ERROR,
} from "../methods/login";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case LOGIN_USER_COMPLETE:
      return {
        ...state,
        isLoading: false,
        userLoged: action.results.data,
      };
      break;
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userLoged: null,
      };
      break;
    case LOGOUT_USER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case LOGOUT_USER_COMPLETE:
      return {
        ...state,
        isLoading: false,
        userLoged: null,
      };
      break;
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userLoged: null,
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
