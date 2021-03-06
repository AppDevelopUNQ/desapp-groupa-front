import { get } from "lodash";

export const isLoadingUser = (state) => get(state, "user.isLoading");
export const getDonations = (state) => get(state, "user.donations");
export const getUser = (state) => get(state, "user.user");
