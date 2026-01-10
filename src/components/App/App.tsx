import "modern-normalize/modern-normalize.css";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

function App() {
  const [page, setPage] = useState(1);
  const perPage = 12;

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <NoteList notes={data?.notes ?? []} />
      )}

      {isFetching && !isLoading && <p>Updating...</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
