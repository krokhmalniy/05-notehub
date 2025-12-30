import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: string;
}

const AUTH_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!AUTH_TOKEN) {
    throw new Error("Oops, autorithation token is undefined");
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

instance.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await instance.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}