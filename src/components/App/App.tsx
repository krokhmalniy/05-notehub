// Бібліотеки
import "modern-normalize/modern-normalize.css";
import { useQuery } from "@tanstack/react-query";

// Стилі
import css from "./App.module.css";

// Компоненти
import NoteList from '../NoteList/NoteList'
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

function App() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["search=example&tag=Todo&page=1&perPage=10&sortBy=created"],
    queryFn: fetchNotes,
   });
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
        <NoteList />
      </div>
      {/* код для прикладу */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default App;
