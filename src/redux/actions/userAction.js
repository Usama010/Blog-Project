import { LOGIN_USER, GET_USERS } from "../constants/actionTypes";

export const setAuth = (auth) => {
  return {
    type: LOGIN_USER,
    payload: auth,
  };
};

export const getAuthPosts = (usersPosts) => {
  return {
    type: GET_USERS,
    payload: usersPosts,
  };
};
