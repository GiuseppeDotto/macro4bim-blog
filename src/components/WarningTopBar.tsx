import "./WarningTopBar.css";

export default function WarningTopBar({ msg, color = "orange" }: { msg: string; color?: string }) {
  return (
    <div
      className={`warn-top-bar${msg !== "" ? " visible" : ""}`}
      style={{ backgroundColor: `${color}` }}
    >
      {msg}
      <button style={{ marginLeft: "auto", display: "block" }} onClick={close}>
        close
      </button>
    </div>
  );
}
