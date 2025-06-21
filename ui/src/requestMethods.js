import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';

let TOKEN = null;

try {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const parsedRoot = JSON.parse(persistRoot);
    const user = parsedRoot.user && JSON.parse(parsedRoot.user);
    TOKEN = user?.currentUser?.accessToken || null;
  }
} catch (err) {
  console.error("Error parsing token from localStorage:", err);
  TOKEN = null;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
