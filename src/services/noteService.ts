// Бібліотеки
import axios from "axios";

// Компоненти
import type { Note } from "../types/note";

interface NotesHttpResponse {
  total_pages: number;
  results: Note[];
}

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;


const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

export async function fetchNotes(): Promise<NotesHttpResponse> {
  if (!TOKEN) {
    throw new Error("TOKEN is missing. Set VITE_NOTEHUB_TOKEN in .env");
  }

  const response = await axiosInstance.get<NotesHttpResponse>("/notes", {
    // params: { query, page },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export async function createNote() {}

export async function deleteNote() {}
