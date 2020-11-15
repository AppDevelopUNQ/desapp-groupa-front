import { LOGIN_USER_START, LOGOUT_USER_START } from "../methods/login";

export const loginUser = (payload) => ({
  type: LOGIN_USER_START,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT_USER_START,
  payload,
});
