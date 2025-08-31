import { useContext, useRef, useState } from "react";
import "./UserSpace.css";
import { auth, GithubSignin, GoogleSignin, signInRegister } from "../config/firebase";
import { UserContext } from "../App";
import { signOut } from "firebase/auth";

export default function UserSpace() {
  const user = useContext(UserContext);

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
    signInRegister(email, password, username);
  };

  const CloseButton = () => {
    return (
      <button className="close-btn" onClick={triggerDialog}>
        X
      </button>
    );
  };

  const NewUserDialog = () => {
    return (
      <>
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
          <button onClick={GoogleSignin} style={{ marginTop: "20px", marginLeft: "auto" }}>
            GOOGLE SIGNIN
          </button>
          <button onClick={GithubSignin} style={{ marginTop: "20px", marginLeft: "auto" }}>
            GITHUB SIGNIN
          </button>
        </div>
        <CloseButton />
      </>
    );
  };

  const UserDialog = () => {
    return (
      <>
        <h3>{user?.displayName}</h3>
        <div className="user-table">
          <div>name</div>
          <div>{user?.displayName}</div>
          <div>email</div>
          <div>{user?.email}</div>
          <div>creation time</div>
          <div>{user?.metadata.creationTime}</div>
          <div>creation last signin</div>
          <div>{user?.metadata.lastSignInTime}</div>
        </div>
        <button onClick={() => signOut(auth)}>SIGN-OUT</button>
        <CloseButton />
      </>
    );
  };

  return (
    <>
      <button className="user-btn" onClick={triggerDialog}>
        {user ? user.displayName : "Login"}
      </button>
      <dialog ref={dialogRef} style={{ width: "min(350px, 90%)" }}>
        {user ? <UserDialog /> : <NewUserDialog />}
      </dialog>
    </>
  );
}
