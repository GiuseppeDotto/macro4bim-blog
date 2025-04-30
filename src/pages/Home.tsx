import { useContext } from "react";
import ToDoList from "../components/common/ToDoList";
import homeVideo from "../assets/BackgroundVideo-h264.mp4";
import { UserContext } from "../App";
import pym4bLogo from "../assets/header/pym4b-white.png";
import RecentPosts from "../components/blog/RecentPost";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="home-hero"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "0",
        }}
      >
        <video
          muted
          loop
          autoPlay
          disablePictureInPicture
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            zIndex: "-1",
            position: "absolute",
          }}
        >
          <source src={homeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img src="/mainLogo.png" alt="macro4bim-logo" style={{ width: "min(750px, 90%)" }} />
        <h1 style={{ display: "none" }}>Macro4BIM</h1>
        <h2 style={{ fontWeight: "200" }}>BLOG ON BIM DIGITAL TECHNOLOGY IN THE AEC INDUSTRY</h2>
      </div>
      <main id="main-main">
        {user?.uid === import.meta.env.VITE_MY_UID ? <ToDoList /> : null}
        {/* START HERE THE PAGE CONTENT */}
        <h1>Macro4BIM</h1>
        <p>
          Macro4BIM is a <b>blog</b> focused on <b>digital design</b> and consulting within the
          Architecture, Engineering, and Construction (AEC) industry. It covers topics related to
          Building Information Modeling (<b>BIM</b>) and computational BIM, particularly the
          advanced use of platforms like <span className="color-1">Dynamo for Revit</span> and{" "}
          <span className="color-3">Python</span> code. <br /> The blog provides insights, tools,
          and solutions for professionals such as BIM specialists, coordinators, and developers.
        </p>
        <h3>Documenting while educating</h3>
        <p>
          We love to write this blog because it is a great platform to keep a record of our studies.
          We often re-read our texts and scripts indeed. 😁 <br />
          Additionally, with our <b>open-source</b> nature, we believe that our texts can be for you
          a valid educational source.
        </p>
        <h2>Most Recent Posts</h2>
        <RecentPosts />
        <h2>
          pyM4B - extension for pyRevit{" "}
          <img
            src="https://img.icons8.com/?size=100&id=P6xa2jpQDe1a&format=png&color=000000"
            alt="pyrevit-icon"
            style={{ width: "2rem", translate: "0 8px" }}
          />
        </h2>
        <p>
          Most of our scripts are built to be used as extension as the majestic pyRevit. <br />
          Although we started deploying only Dynamo package, we are today only focused on pyRevit
          mostly because of its efficiency.
        </p>
        <p>Visit the dedicated page to know more about our open-source extension:</p>
        <button
          style={{ display: "flex", alignItems: "center", width: "100px", margin: "auto" }}
          onClick={() => {
            navigate("/pym4b");
          }}
        >
          <img src={pym4bLogo} style={{ width: "40px" }} />
          Learn More
        </button>
        <h2>Web developing 🌐</h2>
        <p>
          And finally, some updated from our last adventure, the web developing. <br />
          Yes, we are all in with different programming languages (mostly{" "}
          <b style={{ color: "var(--color-third)" }}>javascript</b>) and different ways to approach
          the industry with another set of tools which require{" "}
          <span style={{ color: "var(--color-first" }}>different skills</span> and open new
          horizons.
        </p>
        <div className="image-small">
          <img
            src="https://media3.giphy.com/media/ii8uedZgeKlIKJq1Rz/giphy.gif"
            alt="to-the-moon!"
          />
        </div>
      </main>
    </>
  );
}
