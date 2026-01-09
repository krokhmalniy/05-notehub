import "modern-normalize/modern-normalize.css";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import type { CreateNoteParams } from "../../types/note";

function App() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const perPage = 12;

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const queryKey = useMemo(
    () => ["notes", page, perPage, debouncedSearch] as const,
    [page, perPage, debouncedSearch]
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: (body: CreateNoteParams) => createNote(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
      setPage(1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSettled: () => {
      setDeletingId(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {String(error)}</p>}

      {!isLoading && !isError && (data?.notes?.length ?? 0) === 0 && (
        <p>No notes found.</p>
      )}

      {!isLoading && !isError && (data?.notes?.length ?? 0) > 0 && (
        <NoteList
          notes={data?.notes ?? []}
          onDelete={(id) => deleteMutation.mutate(id)}
          deletingId={deletingId}
        />
      )}

      {isFetching && !isLoading && <p>Updating...</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={(values) => createMutation.mutate(values)}
            isSubmitting={createMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
