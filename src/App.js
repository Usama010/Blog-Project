import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Users from "./components/UserListing/Users";
import PageNotFound from "./components/404/PageNotFound";
import Posts from "./components/Posts/Post";
import UserDetail from "./components/UserListing/UserDetail";
import Header from "./components/Header/header";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
