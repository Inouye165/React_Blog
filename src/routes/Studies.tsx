import React from "react";
import { useState } from "react";
import { getAll, upsertStudy, deleteStudy } from "../data/db";
// import { StudyItem } from "../data/models";
import Tag from "../components/Tag";
import EmptyState from "../components/EmptyState";

const tabs = ["book", "course", "specialization", "video"] as const;

export default function Studies() {
  const [tab, setTab] = useState<typeof tabs[number]>("course");
  const [studies, setStudies] = useState(getAll().studies);


  function handleComplete(id: string) {
    const item = studies.find(s => s.id === id);
    if (item && item.progress < 100) {
      upsertStudy({ ...item, progress: 100, completedAt: new Date().toISOString() });
      setStudies(getAll().studies);
    }
  }

  const filtered = studies.filter(s => s.type === tab);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Studies Tracker</h1>
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button
            key={t}
            className={`px-3 py-1 rounded ${tab === t ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1) + "s"}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState message={`Add your first ${tab}!`} />
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Source</th>
              <th className="text-left p-2">Progress</th>
              <th className="text-left p-2">Tags</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td className="p-2">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{item.title}</a>
                  ) : item.title}
                </td>
                <td className="p-2">{item.source}</td>
                <td className="p-2">
                  <div className="w-32 bg-gray-200 rounded h-4">
                    <div className="bg-blue-600 h-4 rounded" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="ml-2">{item.progress}%</span>
                </td>
                <td className="p-2 flex flex-wrap gap-1">
                  {item.tags.map(tag => <Tag key={tag} label={tag} />)}
                </td>
                <td className="p-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleComplete(item.id)}>Mark 100%</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => { deleteStudy(item.id); setStudies(getAll().studies); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
