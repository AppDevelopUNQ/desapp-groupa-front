import { get } from "lodash";

export const isLoading = (state) => get(state, "login.isLoading");
export const userLoged = (state) => get(state, "login.userLoged");
