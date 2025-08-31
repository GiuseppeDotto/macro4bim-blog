export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="close-btn" onClick={onClick}>
      X
    </button>
  );
}
