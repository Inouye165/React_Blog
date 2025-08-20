import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAll, upsertPost } from "../data/db";
import { Post } from "../data/models";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

function slugify(title: string, posts: Post[], id?: string) {
  let base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let slug = base;
  let i = 1;
  while (posts.some(p => p.slug === slug && p.id !== id)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export default function PostEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const posts = getAll().posts;
  const editing = posts.find(p => p.slug === slug);
  const [title, setTitle] = useState(editing?.title || "");
  const [tags, setTags] = useState(editing?.tags.join(", ") || "");
  const [contentMarkdown, setContentMarkdown] = useState(editing?.contentMarkdown || "");
  const [status, setStatus] = useState<"draft" | "published">(editing?.status || "draft");
  const [autoSave, setAutoSave] = useState(false);

  useEffect(() => {
    if (!autoSave) return;
    const interval = setInterval(() => {
      handleAutoSave();
    }, 5000);
    return () => clearInterval(interval);
  }, [title, tags, contentMarkdown, status, autoSave]);

  function handleAutoSave() {
    const now = new Date().toISOString();
    const post: Post = {
      id: editing?.id || uuidv4(),
      title,
      slug: slugify(title, posts, editing?.id),
      createdAt: editing?.createdAt || now,
      updatedAt: now,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      contentMarkdown,
      status: status as "draft" | "published",
    };
    upsertPost(post);
    // Do not navigate away
    setAutoSave(false);
  }
  function handleSave() {
    const now = new Date().toISOString();
    const post: Post = {
      id: editing?.id || uuidv4(),
      title,
      slug: slugify(title, posts, editing?.id),
      createdAt: editing?.createdAt || now,
      updatedAt: now,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      contentMarkdown,
      status: status as "draft" | "published",
    };
    upsertPost(post);
    setAutoSave(false);
    navigate(`/post/${post.slug}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{editing ? "Edit Post" : "New Post"}</h1>
      <form
        className="space-y-4"
        onSubmit={e => { e.preventDefault(); handleSave(); }}
      >
        <label className="block">
          Title
          <input
            className="border rounded px-2 py-1 w-full"
            value={title}
            onChange={e => { setTitle(e.target.value); setAutoSave(true); }}
            required
            maxLength={160}
          />
        </label>
        <label className="block">
          Tags (comma separated)
          <input
            className="border rounded px-2 py-1 w-full"
            value={tags}
            onChange={e => { setTags(e.target.value); setAutoSave(true); }}
          />
        </label>
        <label className="block">
          Status
          <select
            className="border rounded px-2 py-1 w-full"
            value={status}
            onChange={e => { setStatus(e.target.value as "draft" | "published"); setAutoSave(true); }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="block">
          Markdown Content
          <textarea
            className="border rounded px-2 py-1 w-full h-40"
            value={contentMarkdown}
            onChange={e => { setContentMarkdown(e.target.value); setAutoSave(true); }}
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
      <div className="mt-8">
        <h2 className="font-bold mb-2">Preview</h2>
        <div className="prose bg-gray-100 p-4 rounded">
          <ReactMarkdown>{contentMarkdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
