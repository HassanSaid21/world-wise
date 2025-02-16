import { createContext, useContext, useReducer } from "react";

const initialState = false;

const LoadingStateContext = createContext();


// ✅ Fix reducer to return a boolean directly
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return true;
    case "loaded":
      return false;
      case'error':
      return false 
    default:
      throw new Error("Unknown action type");
  }
}

function LoadingStateProvider({ children }) {
  const [isLoading, dispatch] = useReducer(reducer, initialState);



  function loadingStata (state){
    if (state==='loading') return   dispatch({ type: "loading" });
    else if(state==='loaded') return   dispatch({ type: "loaded" });
    else if(state==='error')
      return dispatch ({type:'error'})
    else throw new Error ('invalid state choose between [loading - error - loaded')

  }

  
  return (
    <LoadingStateContext.Provider value={{ isLoading}}>
      {children}
    </LoadingStateContext.Provider>
  );
}
function useLoading() {
  const context = useContext(LoadingStateContext);
  if (context === undefined)
    throw new Error("the Loading context was used outside the provider");

  return context;
}

export { useLoading, LoadingStateProvider  };
