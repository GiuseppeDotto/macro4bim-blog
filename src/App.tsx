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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializePostManager = async () => {
      await postManager.fetchPosts();
      setPostManager(postManager);
      setLoading(false);
    };
    initializePostManager();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFB) => {
      setUser(userFB);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <>
      <PostManagerContext.Provider value={postManager}>
        <UserContext.Provider value={user}>
          <Header />
          <UserSpace />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post/:slug" element={<PostPage />} />
            </Routes>
          </main>
        </UserContext.Provider>
      </PostManagerContext.Provider>
    </>
  );
}

export default App;
