import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import Cookies from "js-cookie";

const Header = () => {
  const [validateUser, setValidateUser] = useState(false);
  useEffect(() => {
    const authValue = Cookies.get("Auth");
    setValidateUser(authValue);
  });
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("Auth");
    Cookies.remove("Auth");
    setValidateUser(false);
    navigate("/login");
  };
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <Link to="/"> Blog </Link>
          </div>

          <ul>
            <li>
              <Link to="/">Posts</Link>
            </li>
            <li>
              <Link to="/users">User Dashboard</Link>
            </li>
            {validateUser ? (
              <li>
                <span onClick={logout}>Log Out</span>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {/* <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
