import { BsTrash } from "react-icons/bs";

export default function DeleteButton({ onClick = () => {}, subject = "" }) {
  return (
    <button className="btn-del" onClick={onClick}>
      <BsTrash style={{ cursor: "pointer" }} />
      delete {subject}
    </button>
  );
}
