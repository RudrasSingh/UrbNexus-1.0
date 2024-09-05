import { createStore } from "redux";
import { userReducer } from "./reducer"; // Ensure correct import path

export const store = createStore(userReducer);
