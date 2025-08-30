import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  return (
    <div className="main-header">
      <Link to={"/"}>Home</Link>
      <Link to={"/blog"}>Blog</Link>
    </div>
  );
}
