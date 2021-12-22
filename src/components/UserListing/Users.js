import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../App.css";
import AddPosts from "./AddPosts";
import Cookies from "js-cookie";

const Users = () => {
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const validateUser = Cookies.get("Auth");
    setValidate(validateUser);
    if (validateUser === undefined) {
      navigate("/login");
    }
  }, [validate]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 text-left">
            <p>
              <strong>UserName:</strong> {user.name}
            </p>
            <AddPosts />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 text-right">
            <button type="button" className="btn btn-primary">
              <Link className="color-white" to={`/users/${user.id}`}>
                View Posts
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
