import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import PersonalHub from "./components/PersonalHub";
import PostView from "./routes/PostView";
import PostEdit from "./routes/PostEdit";
import Studies from "./routes/Studies";
import NotFound from "./routes/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PersonalHub />} />
        <Route path="/post/new" element={<PostEdit />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/post/:slug/edit" element={<PostEdit />} />
        <Route path="/studies" element={<Studies />} />
        <Route path="/journal" element={<Home />} />
        <Route path="/hub" element={<PersonalHub />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
