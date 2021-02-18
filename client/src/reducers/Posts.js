import * as Types from "./types";

export default (posts = [], action) => {
  switch (action.type) {
    case Types.FETCH_ALL: {
      return action.payload;
    }
    case Types.CREATE: {
      return [...posts, action.payload];
    }

    case Types.UPDATE: {
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case Types.DELETE: {
      return posts.filter((post) => post._id !== action.payload);
    }
    case Types.LIKE: {
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    default:
      return posts;
  }
};
