import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../services/noteService";
import SearchBox from "../SearchBox/SearchBox";

function App() {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [page, setPage] = useState(1);

    console.log(search, debouncedSearch);

  

  return <SearchBox value={search} onChange={setSearch} />;
}

export default App;