import React from "react";
import { FaPencilAlt, FaRegPlusSquare } from "react-icons/fa";
import MyBlogCard from "../components/MyBlogCard";

function MyBlog() {
  return (
    <section className="my-blog">
      <div className="heading">
        <FaPencilAlt />
        <h1>My Blogs</h1>
      </div>

      <button className="create-btn">
        <FaRegPlusSquare />Create a new blog
      </button>

      <div className="myblog-container">
        {/* My Blog Card map here */}
        <MyBlogCard />
        <MyBlogCard />
      </div>
    </section>
  );
}

export default MyBlog;
