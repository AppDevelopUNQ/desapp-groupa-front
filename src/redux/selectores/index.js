import { get } from "lodash";

export const isLoading = (state) => get(state, "search.isLoading");
export const movieResults = (state) => get(state, "search.movieResults.Search");
