import {SEARCH_MOVIE_START} from '../methods/search';

export const searchMovie = payload => ({
    type: SEARCH_MOVIE_START,
    payload
});