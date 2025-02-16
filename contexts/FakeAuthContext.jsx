import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  isAuthenticated: false,
  user: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "loggedIn": {
      return { ...state, user: action.payload, isAuthenticated: true };
    }
    case "logout": {
      return { ...state, isAuthenticated: false, user: null };
    }

    default:
      throw new Error("unknown action type ");
  }
}
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: "loggedIn", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth context was use outside the context provider");

  return context;
}

export { useAuth, AuthProvider };
