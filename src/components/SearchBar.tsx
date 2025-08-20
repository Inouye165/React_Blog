import React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      type="search"
      className="border rounded px-2 py-1"
      placeholder="Search..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      aria-label="Search posts and studies"
    />
  );
}
