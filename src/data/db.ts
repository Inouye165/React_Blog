import { Database, DatabaseSchema, Post, StudyItem } from "./models";
// import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "learning_journal_v1";
const VERSION = 1;

function getAll(): Database {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { version: VERSION, posts: [], studies: [] };
  const parsed = JSON.parse(raw);
  return DatabaseSchema.parse(parsed);
}

function save(db: Database): void {
  DatabaseSchema.parse(db);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function upsertPost(post: Post): Post {
  const db = getAll();
  let posts = db.posts.filter(p => p.id !== post.id);
  posts.push(post);
  save({ ...db, posts });
  return post;
}

function deletePost(id: string): void {
  const db = getAll();
  save({ ...db, posts: db.posts.filter(p => p.id !== id) });
}

function upsertStudy(item: StudyItem): StudyItem {
  const db = getAll();
  let studies = db.studies.filter(s => s.id !== item.id);
  studies.push(item);
  save({ ...db, studies });
  return item;
}

function deleteStudy(id: string): void {
  const db = getAll();
  save({ ...db, studies: db.studies.filter(s => s.id !== id) });
}

function importData(json: Database, mode: "merge" | "replace") {
  DatabaseSchema.parse(json);
  if (mode === "replace") {
    save(json);
  } else {
    const db = getAll();
    const posts = [
      ...db.posts.filter(p => !json.posts.some(jp => jp.id === p.id)),
      ...json.posts,
    ];
    const studies = [
      ...db.studies.filter(s => !json.studies.some(js => js.id === s.id)),
      ...json.studies,
    ];
    save({ version: VERSION, posts, studies });
  }
}

function exportData(): string {
  return JSON.stringify(getAll(), null, 2);
}

export {
  getAll,
  save,
  upsertPost,
  deletePost,
  upsertStudy,
  deleteStudy,
  importData,
  exportData,
  STORAGE_KEY,
  VERSION,
};
