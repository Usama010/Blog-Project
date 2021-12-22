import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { getAuthPosts, setAuth } from "./../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth.user);

  const loginAdmin = async (e) => {
    e.preventDefault();
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = await res.data;
    const loginCheck = await data.find((item) => item.email === admin.email);
    if (!loginCheck) {
      Cookies.remove("Auth");
    } else {
      var minutesToAdd = 15;
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
      Cookies.set("Auth", true, { expires: futureDate, path: "/" });
      setUserId(loginCheck.id);
      navigate(`/users/${loginCheck.id}`);
      dispatch(setAuth(loginCheck));
    }
  };
  const getUserPosts = async () => {
    const fetchPosts = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const res = await fetchPosts.data;
    const singleUserPosts = await res;
    dispatch(getAuthPosts(singleUserPosts));
  };
  useEffect(() => {
    const validateCheck = Cookies.get("Auth");

    getUserPosts();
  }, [userId]);
  return (
    <div>
      <div className="login">
        <div className="form">
          <form className="login-form">
            <span className="material-icons">Login</span>
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              value={admin.email}
            />
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            />
            <button type="submit" onClick={loginAdmin}>
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
