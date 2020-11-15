const localStorage = window.localStorage;

export const GET = (id) => JSON.parse(localStorage.getItem(id));

export const SAVE = (id, data) =>
  localStorage.setItem(id, JSON.stringify(data));

export const DELETE = (id) => localStorage.removeItem(id);
