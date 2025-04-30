import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginButton";

export default function Header() {
  const location = useLocation();

  return (
    <>
      <nav id="main-nav">
        <Link
          id="nav-blog"
          to={"/blog"}
          className={location.pathname === "/blog" ? "current-nav-link" : ""}
        />
        <Link
          id="nav-home"
          to={"/"}
          className={location.pathname === "/" ? "current-nav-link" : ""}
        />
        <Link
          id="nav-pym4b"
          to={"/pym4b"}
          className={location.pathname === "/pym4b" ? "current-nav-link" : ""}
        />
      </nav>
      <LoginForm />
    </>
  );
}
