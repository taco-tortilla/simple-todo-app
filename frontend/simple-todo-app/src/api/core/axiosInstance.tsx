import axios from "axios";

export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});
