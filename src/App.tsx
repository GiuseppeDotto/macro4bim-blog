import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { PostsManager } from "./classes/PostsManager";
import { createContext, useEffect, useState } from "react";
import PostPage from "./components/PostPage";
import UserSpace from "./components/UserSpace";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";

export const PostManagerContext = createContext<PostsManager>(new PostsManager([]));
export const UserContext = createContext<User | null>(null);

function App() {
  const [postManager, setPostManager] = useState(new PostsManager([]));
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => setPostManager(postManager), [postManager]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFB) => {
      setUser(userFB);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <PostManagerContext.Provider value={postManager}>
        <UserContext.Provider value={user}>
          <Header />
          <UserSpace />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:slug" element={<PostPage />} />
          </Routes>
        </UserContext.Provider>
      </PostManagerContext.Provider>
    </>
  );
}

export default App;
