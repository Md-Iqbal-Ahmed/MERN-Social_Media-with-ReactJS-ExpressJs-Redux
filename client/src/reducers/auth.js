import * as Types from "./types";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case Types.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case Types.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
