import {
  DONACION_START,
  SEARCH_DONATIONS_START,
  LOGIN_START,
} from "../methods/user";

export const getDonacionesFor = (payload) => ({
  type: SEARCH_DONATIONS_START,
  payload,
});

export const donate = (payload) => ({
  type: DONACION_START,
  payload,
});

export const login = (payload) => ({
  type: LOGIN_START,
  payload,
});
