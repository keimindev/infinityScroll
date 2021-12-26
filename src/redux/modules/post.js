import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const GET_POST = "GET_POST";

const initialState = {
  posts: [],
  page: 0,
  has_next: false,
};

const getPosts = createAction(GET_POST, (post_data) => ({ post_data }));

// middlewares
const getPostAction = (page) => {
  return async (dispatch, getState, { history }) => {
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=5`)
      .then((res) => {
        let is_next = null;
        if (res.data.length < 5) {
          is_next = false;
        } else {
          is_next = true;
        }
        let post_data = {
          posts: res.data,
          page: page + 1,
          next: is_next,
        };
        dispatch(getPosts(post_data));
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.posts.push(...action.payload.post_data.posts);
        draft.has_next = action.payload.post_data.next;
        draft.page = action.payload.post_data.page;
      }),
  },
  initialState
);

const actionCreators = {
  getPostAction,
};

export { actionCreators };
