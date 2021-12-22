import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuthPosts } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const AddPosts = () => {
  const [addPost, setAddPost] = useState({
    title: "",
    body: "",
    userId: "",
    id: "",
  });
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState([]);
  const selectPosts = useSelector((state) => state.getUsers.user);
  let oldId;
  if (selectPosts.length > 0) {
    oldId = selectPosts.at(-1).id;
  } else if (selectPosts.length == 0) {
    oldId = 0;
  }

  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const createPost = async (e) => {
    e.preventDefault();
    let title = addPost.title;
    let description = addPost.body;
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    const body = {
      title: title,
      body: description,
      userId: parseInt(authUser.id),
    };
    if (title === "" || description === "") {
      alert("please fill the fields");
    } else {
      const data = await axios
        .post("https://jsonplaceholder.typicode.com/posts", body, headers)
        .then((res) => {
          const response = res.data;
          const new_obj = { ...response, id: oldId + 1 };
          setNewPost(new_obj);
          const newUserPost = selectPosts.push(new_obj);
          dispatch(getAuthPosts(selectPosts));
          setAddPost({ ...addPost, body: " ", title: " " });
          navigate(`/users/${parseInt(authUser.id)}`);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    }
  };

  return (
    <form className="margin-top">
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setAddPost({ ...addPost, title: e.target.value })}
          id="title"
          value={addPost.title}
          placeholder="Title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Textarea</label>
        <textarea
          className="form-control"
          placeholder="Description"
          id="exampleFormControlTextarea1"
          value={addPost.body}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={createPost}>
          Add Post
        </button>
      </div>
    </form>
  );
};

export default AddPosts;
