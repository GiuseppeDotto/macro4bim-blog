import { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      // console.log("login event");
    });

    netlifyIdentity.on("logout", (user) => {
      setUser(null);
      // console.log("logout event");
    });

    netlifyIdentity.on("init", () => {
      setUser(user);
      setAuthReady(true);
      // console.log("init event");
    });

    // init netlify identity connection
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const context = { user, login, authReady };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContext;
