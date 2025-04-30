import { BsGithub, BsLinkedin } from "react-icons/bs";
import { GoMail } from "react-icons/go";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
      }}
    >
      <div style={{ marginTop: "auto" }}>
        <small>All right reserved Macro4BIM (c) {new Date().getFullYear()}</small>
      </div>
      <div>
        <h3 style={{ textAlign: "right" }}>Contacts</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="mailto:info@macro4bim.com"
            target="_blank"
            style={{ color: "white", fontSize: "18pt" }}
          >
            <GoMail />
          </a>
          <a
            href="https://github.com/GiuseppeDotto"
            target="_blank"
            style={{ color: "white", fontSize: "18pt" }}
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/company/80157567"
            target="_blank"
            style={{ color: "white", fontSize: "18pt" }}
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
