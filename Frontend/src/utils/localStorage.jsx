// src/utils/localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState",'userInfo');
    if (serializedState === null) return undefined; // Let reducers use initialState
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // Ignore write errors
  }
};
