import "prism-themes/themes/prism-vsc-dark-plus.min.css";
import "./styles/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import PyM4B from "./pages/PyM4B";
import { auth } from "./config/firebase";
import Footer from "./components/common/Footer";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { PostManager } from "./classes/PostManager";

export const UserContext = createContext<User | null>(null);
export const PostManagerContext = createContext(new PostManager());

function App() {
  const [user, setUser] = useState<User | null>(null);
  const postManager = useContext(PostManagerContext);
  const location = useLocation();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => setUser(authUser));
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const fetchPostMetadata = async () => {
      postManager.posts.map(async (post) => {
        await post.fetchCommentsAndMetadata();
      });
    };
    fetchPostMetadata();
  }, []);

  useEffect(() => {
    if (location.pathname.includes("#")) return;
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <UserContext.Provider value={user}>
      <PostManagerContext.Provider value={postManager}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<Blog />} />
          <Route path="/pym4b" element={<PyM4B />} />
        </Routes>
        <Footer />
      </PostManagerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
