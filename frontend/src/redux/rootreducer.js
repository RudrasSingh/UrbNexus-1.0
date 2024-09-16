// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';  // Import your userReducer

const rootReducer = combineReducers({
  user: userReducer,  // The `user` slice will now be managed by `userReducer`
  // You can add other reducers here if needed
});

export default rootReducer;
