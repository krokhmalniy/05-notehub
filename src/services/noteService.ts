import axios from "axios";

const AUTH_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!AUTH_TOKEN) {
    throw new Error("Oops, autorithation token is undefined");
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

instance.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
