import { GET_USERS, LOGIN_USER } from "../constants/actionTypes";

const initialState = {
  user: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export const getUserPosts = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, user: payload };
    default:
      return state;
  }
};
