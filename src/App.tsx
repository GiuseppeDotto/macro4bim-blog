import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <h1>m4b starting over</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
