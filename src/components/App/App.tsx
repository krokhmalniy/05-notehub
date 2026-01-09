
import "modern-normalize/modern-normalize.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Стилі
import css from "./App.module.css";

// Компоненти
import NoteList from '../NoteList/NoteList'
import { fetchNotes } from "../../services/noteService";

function App() {

  const [page,
    // setPage
  ] = useState(1);
  const perPage = 12;
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["notes", page, perPage],
    queryFn: () => fetchNotes({ page, perPage }),
  });
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
        {data?.notes.length > 0 && <NoteList notes={data?.notes ?? []} />}
      </div>
      {/* код для прикладу */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {String(error)}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default App;
