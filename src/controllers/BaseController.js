import axios from "axios";
import data from "./data.json";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://desappunq.herokuapp.com";
const HEADER = {
  "Content-type": "application/json",
};
export const TEST_PROJ = (params) => {
  let d = { data: data };
  if (!params) return d;
  let expresion = new RegExp(`${params.searchText}.*`, "i");
  d.data = d.data.filter(
    (x) =>
      expresion.test(x.name) ||
      expresion.test(x.fancyname) ||
      expresion.test(x.deadline)
  );
  return d;
};
export const TEST_DONA = (params) => {
  let d = { data: data };
  if (!params) return d;
  let expresion = new RegExp(`${params.searchText}.*`, "i");
  d.data = d.data.filter(
    (x) =>
      expresion.test(x.name) ||
      expresion.test(x.fancyname) ||
      expresion.test(x.deadline)
  );
  return d;
};
export const GET = (url, params) =>
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "GET",
    params,
  });

export const POST = (url, data) => {
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "POST",
    data,
  });
};
export const PUT = (url, data) =>
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "PUT",
    data,
  });

export const DELETE = (url, params) =>
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "DELETE",
    params,
  });
