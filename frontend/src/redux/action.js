// Action to set user data (e.g., on sign-in)
export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});

// Action to log out and clear user data
export const logoutUser = () => ({
  type: "LOGOUT_USER", // This should trigger a reducer case to clear user data
});
