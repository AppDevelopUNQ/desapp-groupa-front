import { SEARCH_DONATIONS_START } from "../methods/user";

export const getDonacionesFor = (payload) => ({
  type: SEARCH_DONATIONS_START,
  payload,
});
