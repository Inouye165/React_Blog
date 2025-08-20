import React from "react";
export default function Tag({ label }: { label: string }) {
  return (
    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{label}</span>
  );
}
