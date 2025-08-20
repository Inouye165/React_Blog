import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAll, deletePost } from "../data/db";
import ReactMarkdown from "react-markdown";
import Tag from "../components/Tag";
import ConfirmDialog from "../components/ConfirmDialog";
import { useState } from "react";

export default function PostView() {
  const { slug } = useParams();
  const post = getAll().posts.find(p => p.slug === slug);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500">
        Created: {new Date(post.createdAt).toLocaleString()} • Updated: {new Date(post.updatedAt).toLocaleString()}
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {post.tags.map(tag => <Tag key={tag} label={tag} />)}
      </div>
      <div className="mt-4 prose">
        <ReactMarkdown>{post.contentMarkdown}</ReactMarkdown>
      </div>
      <div className="mt-6 flex gap-2">
        <Link to={`/post/${post.slug}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</Link>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setConfirmOpen(true)}>Delete</button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={() => { deletePost(post.id); navigate("/"); }}
        onCancel={() => setConfirmOpen(false)}
        message="Are you sure you want to delete this post?"
      />
    </div>
  );
}
