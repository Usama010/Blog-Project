import { combineReducers } from "redux";
import { getUserPosts, userReducer } from "./userReducer";

const reducers = combineReducers({
  auth: userReducer,
  getUsers: getUserPosts,
});

export default reducers;
