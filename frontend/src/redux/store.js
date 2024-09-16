import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducer"; // Ensure the correct path to your userReducer

// Combine reducers (even if it's just one)
const rootReducer = combineReducers({
  user: userReducer, // This gives you `state.user`
  // other reducers can be added here in the future
});

// Create the Redux store with the combined reducers
export const store = createStore(rootReducer);
