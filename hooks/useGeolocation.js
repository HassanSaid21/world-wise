import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "loaded":
      return { ...state, isLoading: false, position: action.payload };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
  }
}
export default function useGeolocation(defaultPosition = null) {
  const initialState = {
    isLoading: false,
    position: defaultPosition,
    error: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error, position } = state;
  // const [isLoading, setIsLoading] = useState(false);
  // const [position, setPosition] = useState(defaultPosition);
  // const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return dispatch({
        type: "error",
        action: "Your browser does not support geolocation",
      });
    // setError();
    dispatch({ type: "loading" });
    // setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch({
          type: "loaded",
          payload: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
        // setPosition();
        // setIsLoading(false);
      },
      (error) => {
        dispatch({ type: error, payload: error.message });
        // setError(error.message);
        // setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
