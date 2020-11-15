import axios from "axios";

const BASE_URL = "http://www.omdbapi.com/?apikey=ffd0c3a5";
const HEADER = null;

export const test = (url, params) =>
  axios({
    url: BASE_URL,
    timeout: 1000,
    headers: HEADER,
    method: "GET",
    params,
  });
