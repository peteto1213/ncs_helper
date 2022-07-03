import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaUserCheck,
  FaGraduationCap,
  FaMicroblog,
  FaLock,
  FaBars,
  FaFolderPlus,
  FaCoffee
} from "react-icons/fa";
import collaboration from "../resources/collaboration.png";
import blog from "../resources/blog.jpg";
import feedback from "../resources/feedback.jpg";
import setting from "../resources/setting.jpg";
import password from "../resources/password.png";
import robot from "../resources/robot.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { reset, getAllUsers } from "../features/admin/adminSlice";
import { getAllBlogCategories } from '../features/blogCategory/blogCategorySlice'
import { getAllCourses } from '../features/course/courseSlice'
//Table imports
import UserTable from "../components/UserTable";
import CourseTable from "../components/CourseTable";
import BlogTable from "../components/BlogTable";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const { blogCategories } = useSelector((state) => state.blogCategory)
  const { courses } = useSelector((state) => state.course)

  const [error, setError] = useState("");

  const { user } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("student");
  const [menuClass, setMenuClass] = useState(true);

  //render one time
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setUserType(user.userType); //identify which layout to show
      dispatch(getAllUsers());
      dispatch(getAllBlogCategories());
      dispatch(getAllCourses())
    }
    //Clearer function of useEffect upon leaving the dashboard
    return () => {
      dispatch(reset());
    }
  }, [])

  //render based on conditions
  useEffect(() => {
    if (isError) {
      setError(message);
    }
  }, [isError, message]);

  //admin dashboard menu icon when <768px
  const toggleMenu = () => {
    setMenuClass(!menuClass);
  };

  //if pending state of getting data from backend - return Spinner
  if (isLoading) {
    return <Spinner />;
  }

  //navigate to change password
  const navigateChangePassword = () => {
    navigate("/changePassword");
  };

  return (
    <>
      {userType !== "admin" ? (
        // User dashboard
        <section className="dashboard">
          <div className="heading">
            <FaRocket />
            <h1>Dashboard</h1>
          </div>

          <div className="card-container">
            <div className="card">
              <img src={collaboration} alt="collaboration" />
              <h3>Collaboration Guides</h3>
              <p>
                Manage or publish your created guides according to different
                courses in the program to help others!
              </p>
              <Link to="/collaboration">Manage</Link>
            </div>

            <div className="card">
              <img src={blog} alt="blog" />
              <h3>Blogs</h3>
              <p>
                Manage your personal blogs or write a blog for leisure and
                sharing purposes!
              </p>
              <Link to="/myBlog">View</Link>
            </div>

            <div className="card">
              <img src={setting} alt="setting" />
              <h3>Account settings</h3>
              <p>
                Manage your account settings, such as changing nickname, profile
                picture
              </p>
              <Link to="/userProfile">Manage</Link>
            </div>

            <div className="card">
              <img src={password} alt="setting" />
              <h3>Password Changing</h3>
              <p>Change your password regularly here to protect your account</p>
              <Link to="/changePassword">Change</Link>
            </div>

            <div className="card">
              <img src={feedback} alt="feedback" />
              <h3>Feedback</h3>
              <p>
                Tell us how you feel about this web application, we are welcome
                to hear!
              </p>
              <Link to="/feedback">Send Feedback</Link>
            </div>
          </div>
        </section>
      ) : (
        // Admin dashboard
        <div className="admin-dashboard">
          <div className={menuClass ? "menu" : "menu active"}>
            <div className="logo">
              <a href="#"><img src={robot} alt="" /></a>
              <h2>Admin Dashboard</h2>
            </div>

            <div className="items">
              <li>
                <FaUserCheck className="icon" />{" "}
                <a href="#user">Manage Users</a>
              </li>
              <li>
                <FaGraduationCap className="icon" />{" "}
                <a href="#course">Manage Courses</a>
              </li>
              <li>
                <FaMicroblog className="icon" />{" "}
                <a href="#blog">Manage Blogs</a>
              </li>
              <li>
                <FaCoffee className="icon" />{" "}
                <Link to="/myBlog">My Blogs</Link>
              </li>
              <li onClick={navigateChangePassword}>
                <FaLock className="icon" /> <a href="#">Change Password</a>
              </li>
            </div>
          </div>

          <div className="content">
            <div className="nav">
              <FaBars onClick={toggleMenu} id="menu-btn" className="icon" />
            </div>
            <h3 className="i-name" id="#">
              Website Details
            </h3>

            <div className="values">
              <div className="val-box">
                <FaUserCheck className="icon" />
                <div>
                  <h3>{users.length}</h3>
                  <span>Users</span>
                </div>
              </div>
              <div className="val-box">
                <FaGraduationCap className="icon" />
                <div>
                  <h3>{courses.length}</h3>
                  <span>Courses</span>
                </div>
              </div>
              <div className="val-box">
                <FaMicroblog className="icon" />
                <div>
                  <h3>{blogCategories.length}</h3>
                  <span>Blog Categories</span>
                </div>
              </div>
            </div>

            <div className="board">
              {/* User Table */}
              <table id="user">
                <thead>
                  <tr>
                    <td>Nickname</td>
                    <td>Email Address</td>
                    <td>Status</td>
                    <td>Permission Type</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* User Map here */}
                {users.map((element) => (
                  <UserTable user={element} />
                ))}
              </table>

              <button className="btn"><FaFolderPlus />Add a New Course</button>
              {/* Course Table */}
              <table id="course">
                <thead>
                  <tr>
                    <td>Course Code</td>
                    <td>Course Name</td>
                    <td>Description</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* Course Map here */}
                {courses.map(course => 
                  <CourseTable
                    courseCode = {course.courseCode}
                    name = {course.name}
                    description = {course.description}
                    courseId = {course._id}
                  />
                )}
              </table>

              <button className="btn"><FaFolderPlus />Add a New Blog Category</button>
              {/* Blog Table */}
              <table id="blog">
                <thead>
                  <tr>
                    <td>Blog category</td>
                    <td>Description</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* Blog Map here */}
                {blogCategories.map(category => 
                    <BlogTable category={category}/>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
