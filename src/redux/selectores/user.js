import { get } from "lodash";

export const isLoading = (state) => get(state, "user.isLoading");
export const getDonations = (state) => get(state, "user.donations");
