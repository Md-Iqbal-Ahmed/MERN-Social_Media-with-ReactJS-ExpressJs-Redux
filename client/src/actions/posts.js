import * as Types from "../reducers/types";
import * as api from "../api/index";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: Types.FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: Types.CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: Types.UPDATE, payload: data });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: Types.LIKE, payload: data });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: Types.DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// export const getPosts = () => async (dispatch) => {
//   axios
//     .get("http://localhost:5000/posts")
//     .then((response) => {
//       dispatch({
//         type: Types.FETCH_ALL,
//         payload: response.data,
//       });
//     })
//     .catch((error) => console.log(error));
// };

// export const createPost = (post) => (dispatch) => {
//   axios
//     .post("http://localhost:5000/posts", post)
//     .then((response) => {
//       dispatch({
//         type: Types.CREATE,
//         payload: response.data,
//       });
//     })
//     .catch((error) => console.log(error));
// };

// export const updatePost = (id, post) => (dispatch) => {
//   axios
//     .put(`http://localhost:5000/posts/${id}`, post)
//     .then((response) => {
//       dispatch({
//         type: Types.UPDATE,
//         payload: response.data,
//       });
//     })
//     .catch((error) => console.log(error));
// };

// export const deletePost = (id) => (dispatch) => {
//   axios
//     .delete(`http://localhost:5000/posts/${id}`)
//     .then((result) => {
//       dispatch({
//         type: Types.DELETE,
//         payload: result._id,
//       });
//     })
//     .catch((error) => console.log(error));
// };
