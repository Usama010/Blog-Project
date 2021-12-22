import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthPosts } from "../../redux/actions/userAction";
import Cookies from "js-cookie";

const UserDetail = () => {
  const [userPost, setUserPost] = useState([]);
  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
    userId: "",
    id: "",
  });
  const [deletePost, setDeletePost] = useState();
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [length, setLength] = useState(1);
  const [authCookie, setAuthCookie] = useState();

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.getUsers.user);

  // Edit Post
  function editBooks(title, body, userId, id) {
    var book = selector.find((b) => b.id === id);
    if (book) {
      book.title = title;
      book.body = body;
      book.userId = userId;
    } else {
      selector.push({ title, body, userId, id });
    }
  }

  const navigate = useNavigate();

  // Edit Post Form
  const editPostForm = (e) => {
    e.preventDefault();
    const AuthChecker = Cookies.get("Auth");
    setAuthCookie(AuthChecker);
    if (authCookie != undefined) {
      if (editPost.id === "") {
        alert("Please Edit Valid Post");
      } else {
        editBooks(editPost.title, editPost.body, editPost.userId, editPost.id);
        const newEditPosts = selector;
        setNewData(newEditPosts);
        dispatch(getAuthPosts(newEditPosts));
        setEditPost({
          ...editPost,
          title: "",
          body: "",
          id: "",
          userId: "",
        });
      }
    } else {
      navigate("/login");
      Cookies.remove("Auth");
    }
  };

  // Delete Post
  const deleteUserPost = (dataPost) => {
    const AuthChecker = Cookies.get("Auth");
    setAuthCookie(AuthChecker);
    if (authCookie != undefined) {
      setLoading(true);
      let dataPostUser = dataPost;
      if (dataPostUser) {
        let filterObj = selector.filter((item) => item.id !== dataPostUser.id);
        dispatch(getAuthPosts(filterObj));
        setLength(filterObj.length);
        setLoading(false);
      }
    } else {
      navigate("/login");
      Cookies.remove("Auth");
    }
  };
  useEffect(() => {
    const validateUser = Cookies.get("Auth");
    setAuthCookie(validateUser);
    if (validateUser === undefined) {
      navigate("/login");
    }
  }, [authCookie]);

  return (
    <section>
      <div className="container">
        <Link className="btn btn-primary" to="/users">
          Add Post
        </Link>
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {selector.map((data) => (
                <div className="col-lg-6 cards-custom" key={data.id}>
                  <div className="card">
                    <div className="btn-wraper">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => {
                          setEditPost(data);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUserPost(data)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="card-body">
                      <p>UserId: {data.userId}</p>
                      <h4 className="card-title">{data.title}</h4>
                      <p className="card-text">{data.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {length > 0 ? (
            <div className="col-lg-4">
              <h3>Edit Post</h3>
              <form className="margin-top">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                    id="title"
                    value={editPost.title}
                    placeholder="Title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Textarea</label>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    id="exampleFormControlTextarea1"
                    value={editPost.body}
                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" onClick={editPostForm}>
                    Edit Post
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDetail;
