import axios from "axios";

export const API = axios.create({
  baseURL: "https://airhome.onrender.com/api",
  withCredentials: true,
});
