import React from "react";
import { Post } from "../data/models";
import { Link } from "react-router-dom";
import Tag from "./Tag";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <Link to={`/post/${post.slug}`} className="text-lg font-bold hover:underline">{post.title}</Link>
      <div className="text-sm text-gray-500">
        {new Date(post.updatedAt).toLocaleString()} • {post.status}
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {post.tags.map(tag => <Tag key={tag} label={tag} />)}
      </div>
      <div className="mt-2 text-gray-700 line-clamp-2">{post.contentMarkdown.slice(0, 120)}...</div>
    </div>
  );
}
