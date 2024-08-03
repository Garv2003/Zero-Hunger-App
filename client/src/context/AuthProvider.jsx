import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import propTypes from "prop-types";

const authContext = createContext();

function AuthProvider({ children }) {
  const { data: user, setData: setUser } = useLocalStorage();
  const [isAuthenticated, setAuthenticated] = useState();

  function loginFunc(newUser) {
    setUser(newUser);
    setAuthenticated(true);
  }

  function logoutFunc() {
    setUser();
    setAuthenticated(false);
  }
  return (
    <authContext.Provider
      value={{ user, isAuthenticated, setAuthenticated, loginFunc, logoutFunc }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  const data = useContext(authContext);
  if (!data) {
    throw new Error("Accessing from outside the scope");
  }
  return data;
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AuthProvider;
