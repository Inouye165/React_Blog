import React from "react";
export default function EmptyState({ message, cta }: { message: string; cta?: React.ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="text-lg text-gray-500 mb-4">{message}</div>
      {cta}
    </div>
  );
}
