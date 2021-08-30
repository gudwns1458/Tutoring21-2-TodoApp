import { BASE_URL, GET, POST, PUT, DELETE } from "../constants/api.js";

const request = async (url = '', options) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    if (!res.ok) console.error(res.status);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const options = (method, body) => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

export const http = {
  get: url => request(url, options(GET)),
  post: (url, body) => request(url, options(POST, body)),
  put: (url, body) => request(url, options(PUT, body)),
  delete: url => request(url, options(DELETE))
}