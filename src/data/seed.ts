import { Post, StudyItem } from "./models";
import { v4 as uuidv4 } from "uuid";

export const samplePosts: Post[] = [
  {
    id: uuidv4(),
    title: "Setting up ESP32 dev env",
    slug: "setting-up-esp32-dev-env",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["esp32", "setup", "hardware"],
    contentMarkdown: "## ESP32 Setup\nHere's how I set up my ESP32 dev environment...",
    status: "draft",
  },
  {
    id: uuidv4(),
    title: "What I learned from React hooks today",
    slug: "what-i-learned-from-react-hooks-today",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["react", "hooks", "learning"],
    contentMarkdown: "## React Hooks\nToday I explored useEffect and useReducer...",
    status: "published",
  },
];

export const sampleStudies: StudyItem[] = [
  {
    id: uuidv4(),
    type: "course",
    title: "Deep Learning Specialization",
    source: "Coursera",
    url: "https://coursera.org/specializations/deep-learning",
    notes: "In progress, great content!",
    startedAt: new Date().toISOString(),
    progress: 40,
    tags: ["ai", "ml"],
  },
  {
    id: uuidv4(),
    type: "course",
    title: "React Complete Guide",
    source: "Udemy",
    url: "https://udemy.com/react-complete-guide",
    notes: "Completed, highly recommended.",
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    progress: 100,
    tags: ["react", "frontend"],
  },
  {
    id: uuidv4(),
    type: "book",
    title: "Clean Code",
    source: "Book",
    notes: "Reading slowly, lots to digest.",
    startedAt: new Date().toISOString(),
    progress: 20,
    tags: ["coding", "best-practices"],
  },
  {
    id: uuidv4(),
    type: "video",
    title: "JavaScript Mastery Playlist",
    source: "YouTube",
    url: "https://youtube.com/playlist?list=JS-Mastery",
    notes: "Great for brushing up JS.",
    startedAt: new Date().toISOString(),
    progress: 60,
    tags: ["javascript", "video"],
  },
];
