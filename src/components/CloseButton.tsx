export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="btn-alert"
      style={{ position: "absolute", top: "1rem", right: "1rem" }}
      onClick={onClick}
    >
      X
    </button>
  );
}
