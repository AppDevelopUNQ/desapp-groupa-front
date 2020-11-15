import axios from "axios";

const BASE_URL = "http://localhost:8080";
const HEADER = {
  "Content-type": "application/json",
};

export const GET = (url, params) =>
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "GET",
    params,
  });

export const POST = (url, data) =>
  axios({
    url: `${BASE_URL}/${url}`,
    timeout: 1000,
    headers: HEADER,
    method: "POST",
    data,
  });

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
