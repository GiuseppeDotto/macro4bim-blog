function WipDiv() {
  return (
    <div className="image-small">
      <img
        src="https://media2.giphy.com/media/hvN3SkNMRSB7mZa8JL/giphy.gif"
        alt="wip"
        style={{ objectFit: "cover" }}
      />
      <p>We are working on it...</p>
    </div>
  );
}

export default function WIPmodal({ asModal = false, showModal = false }) {
  if (asModal) {
    if (showModal) document.getElementById("wip-modal").showModal();
    return (
      <dialog id="wip-modal">
        <WipDiv />
      </dialog>
    );
  } else {
    return <WipDiv />;
  }
}
