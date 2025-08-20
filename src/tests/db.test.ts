import { describe, it, expect, beforeEach } from "vitest";
import { getAll, save, upsertPost, upsertStudy, deletePost, deleteStudy } from "../data/db";
import { Post, StudyItem } from "../data/models";
import { v4 as uuidv4 } from "uuid";

describe("Data Layer", () => {
  beforeEach(() => {
    save({ version: 1, posts: [], studies: [] });
  });

  it("should upsert and get posts", () => {
    const post: Post = {
      id: uuidv4(),
      title: "Test Post",
      slug: "test-post",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["test"],
      contentMarkdown: "Hello",
      status: "draft",
    };
    upsertPost(post);
    const db = getAll();
    expect(db.posts.length).toBe(1);
    expect(db.posts[0].title).toBe("Test Post");
  });

  it("should delete posts", () => {
    const post: Post = {
      id: uuidv4(),
      title: "Delete Me",
      slug: "delete-me",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      contentMarkdown: "",
      status: "draft",
    };
    upsertPost(post);
    deletePost(post.id);
    expect(getAll().posts.length).toBe(0);
  });

  it("should upsert and get studies", () => {
    const study: StudyItem = {
      id: uuidv4(),
      type: "book",
      title: "Test Book",
      source: "Book",
      progress: 10,
      tags: [],
    };
    upsertStudy(study);
    const db = getAll();
    expect(db.studies.length).toBe(1);
    expect(db.studies[0].title).toBe("Test Book");
  });

  it("should delete studies", () => {
    const study: StudyItem = {
      id: uuidv4(),
      type: "book",
      title: "Delete Book",
      source: "Book",
      progress: 0,
      tags: [],
    };
    upsertStudy(study);
    deleteStudy(study.id);
    expect(getAll().studies.length).toBe(0);
  });

  it("should ensure slug uniqueness", () => {
    const post1: Post = {
      id: uuidv4(),
      title: "Unique Slug",
      slug: "unique-slug",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      contentMarkdown: "",
      status: "draft",
    };
    const post2: Post = {
      id: uuidv4(),
      title: "Unique Slug",
      slug: "unique-slug-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      contentMarkdown: "",
      status: "draft",
    };
    upsertPost(post1);
    upsertPost(post2);
    const db = getAll();
    expect(db.posts.map(p => p.slug)).toEqual(["unique-slug", "unique-slug-1"]);
  });
});
