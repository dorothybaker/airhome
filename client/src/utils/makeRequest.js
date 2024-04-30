import axios from "axios";

export const API = axios.create({
  baseURL: "https://airhome-server.vercel.app/api",
  withCredentials: true,
});
