import React from "react";
import { useEffect, useState } from "react";
import { getAll } from "../data/db";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [posts, setPosts] = useState<import("../data/models").Post[]>([]);
  useEffect(() => {
    setPosts(getAll().posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Journal</h1>
        <a href="/hub" className="text-sm text-neutral-600 underline">Back to Hub</a>
      </div>
      {posts.length === 0 ? (
        <EmptyState message="Write your first post!" cta={<a href="/post/new" className="text-blue-600 underline">New Post</a>} />
      ) : (
        posts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
