import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  isAuthenticated: false,
  user: {},
  wrong: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "loggedIn": {
      return { ...state, user: action.payload, isAuthenticated: true };
    }
    case "logout": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "wrong": {
      return { ...state, wrong: action.payload };
    }

    default:
      throw new Error("unknown action type ");
  }
}
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ isAuthenticated, user, wrong }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, pass) {
    if (!email || !pass){
      dispatch({ type: "wrong", payload: "Please fill in both fields." });
    return ;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      dispatch({ type: "wrong", payload: "Please enter a valid email address." });
      return ;
    }
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: "loggedIn", payload: FAKE_USER });
    else
    dispatch({ type: "wrong", payload: "wrong credentials, try again" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, wrong }}
    >
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
