// Бібліотеки
import axios from "axios";

// Компоненти
import type { Note, NoteTag } from "../types/note";


// Інтерфейси
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: "created" | "updated";
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

axiosInstance.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
  sortBy,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  if (!TOKEN) {
    throw new Error("TOKEN is missing. Set VITE_NOTEHUB_TOKEN in .env");
  }

const params = {
  page,
  perPage,
  ...(search?.trim() ? { search: search.trim() } : {}),
  ...(tag ? { tag } : {}),
  ...(sortBy ? { sortBy } : {}),
};

  console.log("FETCH PARAMS", params);
  
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params,
  });
  return response.data;
}

export async function createNote(
  body: CreateNoteParams
): Promise<FetchNotesResponse> {
  if (!TOKEN) {
    throw new Error("TOKEN is missing. Set VITE_NOTEHUB_TOKEN in .env");
  }

  const response = await axiosInstance.post<FetchNotesResponse>("/notes", {
    body,
  });
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await axiosInstance.delete<FetchNotesResponse>("/notes", {
    id,
  });
  return response.data;
}
