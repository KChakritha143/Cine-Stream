import { useState, useEffect } from "react";
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  return (
    <input type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value) }/>
  );
}

export default SearchBar;