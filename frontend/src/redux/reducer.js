const initialState = {
  userData: null, // Initial state with `userData` set to null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload, // Update `userData` with payload
      };
    default:
      return state; // Return current state for unknown action types
  }
};
