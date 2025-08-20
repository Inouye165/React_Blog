import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div>
      <nav className="bg-white shadow flex items-center px-4 py-2">
        <Link to="/" className="font-bold text-xl mr-4">Journal</Link>
        <Link to="/studies" className="mr-4">Studies</Link>
        <Link to="/post/new" className="mr-4">+ New Post</Link>
        <Link to="#" className="mr-4">Import/Export</Link>
        <div className="flex-1" />
        <SearchBar />
      </nav>
      <main className="max-w-3xl mx-auto p-4">{children}</main>
    </div>
  );
}
