import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckSquare, Book, PlaySquare, BookOpen, FolderGit2, ChevronRight } from "lucide-react";

/**
 * PersonalHub – Refined Layout
 */
export default function PersonalHub() {
  const today = new Date();
  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const currentProject = {
    title: "Employee Manager (Phase 4)",
    tags: ["Node.js", "AWS EC2", "Auth"],
    progress: 62,
    nextAction: "Implement session storage + login UI",
    link: "/projects/employee-manager",
  };

  const currentClasses = [
    { name: "AI Engineering Specialization (Scrimba/Coursera)", status: "In progress", link: "/studies/ai-engineering" },
    { name: "OOP in Java (Duke Coursera)", status: "Module: Vigenère", link: "/studies/oop-java" },
  ];

  const todos = [
    { id: 1, text: "Finish MySQL change-log writer", done: false },
    { id: 2, text: "Write blog post: What I learned this week", done: false },
    { id: 3, text: "Order ESP32 buck converter", done: true },
  ];

  const books = [
    { title: "Clean Architecture", author: "Robert C. Martin" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
  ];

  const videos = [
    { title: "React useReducer Deep Dive", channel: "Web Dev Simplified" },
    { title: "ESP32 I2S Audio Basics", channel: "Atomic14" },
  ];

  const miniCalendar = Array.from({ length: 5 }, (_, i) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
    events: i % 2 === 0 ? ["Study block"] : [],
  }));

  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" },
  } as const;

  return (
    <div className="min-h-screen relative text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-4">
          <div className="font-semibold tracking-tight text-xl">Personal Hub</div>
          <nav className="ml-auto flex items-center gap-1 text-sm">
            {[
              { label: "Calendar", href: "/calendar", Icon: CalendarDays },
              { label: "To‑do", href: "/todos", Icon: CheckSquare },
              { label: "Projects", href: "/projects", Icon: FolderGit2 },
              { label: "Classes", href: "/studies", Icon: BookOpen },
              { label: "Books", href: "/books", Icon: Book },
              { label: "Videos", href: "/videos", Icon: PlaySquare },
              { label: "Journal", href: "/journal", Icon: BookOpen },
            ].map(({ label, href, Icon }) => (
              <a key={href} href={href} className="px-2 py-1 rounded hover:bg-neutral-100 flex items-center gap-1">
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 pt-6">
        <motion.div {...fadeUp} className="rounded-xl border bg-white shadow p-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Good day, Ron 👋</h1>
              <p className="text-neutral-600 mt-1 text-sm">{today.toLocaleDateString(undefined,{weekday:"long", month:"long", day:"numeric"})}</p>
            </div>
            <div className="flex gap-2">
              <QuickAction href="/journal">New Journal</QuickAction>
              <QuickAction href="/todos">Add To‑do</QuickAction>
              <QuickAction href="/projects">New Project</QuickAction>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-2 mt-4">
            <NowPill label="Today's focus" value="Deep work 10–12" />
            <NowPill label="Next event" value={`${fmt(miniCalendar[0].date)} – ${miniCalendar[0].events[0] ?? "Free"}`} />
            <NowPill label="Current project" value={currentProject.title} href={currentProject.link} />
          </div>
        </motion.div>
      </section>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-5 py-6 grid gap-4 lg:grid-cols-3">
        {/* Left */}
        <section className="lg:col-span-2 space-y-4">
          <MotionCard title="Current Project" action={{ label: "Open", href: currentProject.link }}>
            <h3 className="text-lg font-medium">{currentProject.title}</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {currentProject.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 border">{t}</span>
              ))}
            </div>
            <div className="mt-3">
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-900" style={{ width: `${currentProject.progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-neutral-600">Progress: {currentProject.progress}% • Next: {currentProject.nextAction}</p>
            </div>
          </MotionCard>

          <MotionCard title="Current Classes" action={{ label: "All classes", href: "/studies" }}>
            <ul className="mt-2 grid gap-2">
              {currentClasses.map((c, i) => (
                <li key={i} className="flex items-start justify-between p-3 border rounded-xl bg-white hover:shadow-sm transition">
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-neutral-600">{c.status}</div>
                  </div>
                  <a className="text-xs inline-flex items-center gap-1 underline underline-offset-2" href={c.link}>
                    Open <ChevronRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        {/* Right */}
        <aside className="space-y-4">
          <MotionCard title="This Week" action={{ label: "Full calendar", href: "/calendar" }}>
            <ul className="mt-2 grid gap-1">
              {miniCalendar.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <div className="w-14 shrink-0 p-1 text-center border rounded-lg bg-white">
                    <div className="uppercase text-neutral-500">{d.date.toLocaleString(undefined, { weekday: "short" })}</div>
                    <div className="font-semibold">{fmt(d.date)}</div>
                  </div>
                  <div className="flex-1 pt-1">{d.events.length ? d.events.join(", ") : "No events"}</div>
                </li>
              ))}
            </ul>
          </MotionCard>

          <MotionCard title="Quick To‑dos" action={{ label: "Open list", href: "/todos" }}>
            <ul className="mt-2 grid gap-1 text-sm">
              {todos.map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={t.done} className="h-3 w-3 rounded border-neutral-300" />
                  <span className={t.done ? "line-through text-neutral-500" : ""}>{t.text}</span>
                </li>
              ))}
            </ul>
          </MotionCard>

          <MotionCard title="Reading" action={{ label: "All books", href: "/books" }}>
            <ul className="mt-2 grid gap-1 text-xs">
              {books.map((b) => (
                <li key={b.title}><span className="font-medium">{b.title}</span> — {b.author}</li>
              ))}
            </ul>
          </MotionCard>

          <MotionCard title="Saved Videos" action={{ label: "All videos", href: "/videos" }}>
            <ul className="mt-2 grid gap-1 text-xs">
              {videos.map((v) => (
                <li key={v.title}><span className="font-medium">{v.title}</span> — {v.channel}</li>
              ))}
            </ul>
          </MotionCard>
        </aside>

        {/* Journal teaser */}
        <section className="lg:col-span-3">
          <MotionCard title="From the Journal" action={{ label: "Open journal", href: "/journal" }}>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <article key={i} className="p-3 border rounded-xl bg-white hover:shadow">
                  <div className="text-[11px] text-neutral-500">{fmt(today)}</div>
                  <div className="mt-0.5 font-medium text-sm">"Small win" log #{i}</div>
                  <p className="mt-0.5 text-xs text-neutral-600">A quick note about what I learned or shipped today…</p>
                </article>
              ))}
            </div>
          </MotionCard>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-5 py-3 text-xs text-neutral-500">Built with ❤️. Focus first; details later.</div>
      </footer>
    </div>
  );
}

function QuickAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-2 py-1 rounded-lg border bg-white hover:bg-neutral-50 transition text-xs shadow-sm">
      {children}
    </a>
  );
}

function NowPill({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-neutral-50 transition text-xs">
      <div>
        <div className="uppercase tracking-wider text-[10px] text-neutral-500">{label}</div>
        <div className="font-medium mt-0.5">{value}</div>
      </div>
      {href ? <ChevronRight className="h-3 w-3 text-neutral-400" /> : null}
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function MotionCard({ title, action, children }: { title: string; action?: { label: string; href: string }; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-4 rounded-xl border bg-white shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {action && (
          <a href={action.href} className="text-xs underline underline-offset-2 hover:no-underline">
            {action.label}
          </a>
        )}
      </div>
      <div className="mt-2">{children}</div>
    </motion.div>
  );
}
