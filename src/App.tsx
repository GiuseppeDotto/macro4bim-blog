import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { PostsManager } from "./classes/PostsManager";
import { createContext, useEffect, useState } from "react";

export const PostManagerContext = createContext<PostsManager>(new PostsManager([]));

function App() {
  const [postManager, setPostManager] = useState(new PostsManager([]));
  useEffect(() => setPostManager(postManager), [postManager]);
  return (
    <>
      <PostManagerContext.Provider value={postManager}>
        <Header />
        <h1>m4b starting over</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </PostManagerContext.Provider>
    </>
  );
}

export default App;
