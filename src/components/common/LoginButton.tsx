import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { auth } from "../../config/firebase";

export default function LoginForm() {
  const [btnName, setBtnName] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dialog = useRef<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return setBtnName("Login");
      if (user.displayName) return setBtnName(user.displayName);
    });
    return () => unsubscribe();
  }, []);

  const handleSignupAndLogin = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(newUser.user, { displayName: email.split("@")[0] });
    } catch (error) {
      switch ((error as FirebaseError).code) {
        case "auth/email-already-in-use":
          try {
            signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            // window.alert("email already in use");
            console.error(error);
          }
          break;
        default:
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (err) {
            switch ((error as FirebaseError).code) {
              case "auth/invalid-credential":
                window.alert("mail or password wrong");
                break;
              default:
                console.error(err);
                break;
            }
          }
          break;
      }
    }
  };

  const handleSignout = async () => {
    await auth.signOut();
  };

  const handlePassRecovery = async () => {
    await sendPasswordResetEmail(auth, email);
  };

  const triggerModal = () => {
    if (!(dialog.current instanceof HTMLDialogElement)) return;
    dialog.current.open ? dialog.current.close() : dialog.current.showModal();
  };

  const signupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const FormSignup = () => {
    return (
      <form action="">
        <label htmlFor="email">
          email: <br />
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="pass">
          password: <br />
          <input
            type="password"
            name="pass"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <small onClick={handlePassRecovery}>password recovery</small>
        </label>
        <div>
          <button type="reset" onClick={triggerModal}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              dialog.current.querySelector("form")?.reset();
              handleSignupAndLogin();
              triggerModal();
            }}
          >
            SignUp/LogIn
          </button>
        </div>
        <div style={{ borderTop: "1px solid #ddd", flexDirection: "column", paddingTop: "10px" }}>
          <span>Login with:</span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              type="button"
              onClick={() => {
                signupWithGoogle();
                triggerModal();
              }}
            >
              Google
            </button>
          </div>
        </div>
      </form>
    );
  };

  // return both the button and the modal
  return (
    <>
      <button
        onClick={triggerModal}
        style={{
          position: "fixed",
          top: "20px",
          right: "1rem",
          display: "flex",
          color: `${btnName === "Login" ? "" : "white"}`,
        }}
      >
        {btnName === "Login" ? <BsPerson /> : <BsPersonFill />}
        <span style={{ marginLeft: "0.25rem" }}>{btnName}</span>
      </button>
      <dialog ref={dialog} className="dialog-login">
        {btnName === "Login" ? (
          <>
            <h3>Signup/Login</h3>
            <FormSignup />
          </>
        ) : (
          <button
            onClick={() => {
              handleSignout();
              triggerModal();
            }}
          >
            SignOut
          </button>
        )}
      </dialog>
    </>
  );
}
