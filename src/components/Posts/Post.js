import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./../Header/header";
import "../../App.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = await res.data;
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="Posts">
      <div className="container">
        <h2>Posts</h2>
        <div className="row">
          {posts.slice(0, 20).map((data) => (
            <div className="col-lg-4 cards-custom" key={data.id}>
              <div className="card">
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
    </section>
  );
};

export default Posts;
