import { useRef, useState } from "react";
import "./UserSpace.css";

export default function UserSpace() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const triggerDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
  };

  const loginRegister = () => {
    if (!email) return;
    if (!password) return;
    if (!username) setUsername(email.split("@")[0]);
    console.log(`registering ${email}`);
  };

  return (
    <>
      <button className="user-btn" onClick={triggerDialog}>
        Login
      </button>

      <dialog ref={dialogRef} style={{ width: "min(350px, 90%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <h3>New User</h3>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPass(e.target.value)} />
          <button onClick={loginRegister} style={{ marginTop: "20px", marginLeft: "auto" }}>
            LOGIN / REGISTER
          </button>
        </div>
        <button className="close-btn" onClick={triggerDialog}>
          X
        </button>
      </dialog>
    </>
  );
}
