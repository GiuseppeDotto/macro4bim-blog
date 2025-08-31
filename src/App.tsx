import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { PostsManager } from "./classes/PostsManager";
import { createContext, useEffect, useState } from "react";
import PostPage from "./components/PostPage";
import UserSpace from "./components/UserSpace";

export const PostManagerContext = createContext<PostsManager>(new PostsManager([]));

function App() {
  const [postManager, setPostManager] = useState(new PostsManager([]));
  useEffect(() => setPostManager(postManager), [postManager]);

  return (
    <>
      <PostManagerContext.Provider value={postManager}>
        <Header />
        <UserSpace />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<PostPage />} />
        </Routes>
      </PostManagerContext.Provider>
    </>
  );
}

export default App;
