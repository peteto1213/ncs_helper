import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFolderPlus, FaFastBackward, FaFileUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubtopicsByCourseId,
  addLearningResourceToSubtopic,
  reset,
} from "../features/subtopic/subtopicSlice";
import { getCourseByCourseId } from "../features/course/courseSlice";
import Spinner from "../components/Spinner";

function AddResources() {

    /**
     * @author Pete To
     * @description Validate whether the provided link is a valid url or not
     * @param {*} link 
     * @returns boolean value
     */
  const validateLink = (link) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      link
    );
  }

  const [error, setError] = useState("")

  const dispatch = useDispatch();
  const { viewingCourse } = useSelector((state) => state.course);
  const { subtopics, isLoading, isError, message } = useSelector(
    (state) => state.subtopic
  );
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const navigateSingleCourse = () => {
    navigate('/allCourses');
  };

  const [resourceForm, setResourceForm] = useState({
    title: "",
    link: "",
    type: "",
    subtopic: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setResourceForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleUpload = (event) => {
    event.preventDefault()
    let body = {
        title: resourceForm.title,
        link: resourceForm.link,
        type: resourceForm.type,
        subtopic: resourceForm.subtopic
    }

    if(validateLink(body.link)){
        dispatch(addLearningResourceToSubtopic(body))
        alert('Resource uploaded successfully!')
        navigate('/allCourses')
    }else{
        setError("*Please provide a valid url for the resource")
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      alert("message");
      navigate("/home");
    }
    dispatch(getCourseByCourseId(localStorage.getItem("viewCourseId")));
    dispatch(getSubtopicsByCourseId(localStorage.getItem("viewCourseId")));
  }, [dispatch, navigate, isError, message, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="add-resources">
      <div className="heading">
        <FaFolderPlus className="icon" />
        <h1>
          Add learning resources to <span>{viewingCourse.courseCode}</span>
        </h1>
      </div>

      <form onSubmit={handleUpload}>
        <div className="input-field">
          <h3>Name of the resource</h3>
          <input
            type="text"
            name="title"
            value={resourceForm.title}
            onChange={handleFormChange}
            placeholder="resource name..."
            required
          />
        </div>

        <div className="input-field">
          <h3>Link to the resource</h3>
          {error && <h3 className="error-text">{error}</h3>}
          <input
            type="text"
            name="link"
            value={resourceForm.link}
            onChange={handleFormChange}
            placeholder="resource link..."
            required
          />
        </div>

        <div className="input-field">
          <h3>Type of the resource</h3>
          <select
            name="type"
            value={resourceForm.type}
            onChange={handleFormChange}
            id="type"
            required
          >
            <option value="">===Select a Type===</option>
            <option value="Documentation">Documentation</option>
            <option value="Article">Article</option>
            <option value="Video">Video</option>
          </select>
        </div>

        <div className="input-field">
          <h3>Related CSC8011 Subtopic</h3>
          <select
            name="subtopic"
            value={resourceForm.subtopic}
            onChange={handleFormChange}
            id="subtopic"
            required
          >
            <option value="">
              ===Select a {viewingCourse.courseCode} subtopic===
            </option>
            {/* Subtopics map here */}
            {subtopics.map((subtopic) => (
              <option key={subtopic._id} value={subtopic._id}>
                {subtopic.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn">
          <FaFileUpload /> Upload the Resource
        </button>
      </form>

      <button onClick={navigateSingleCourse} className="back-btn">
        <FaFastBackward /> Back to Course
      </button>
    </section>
  );
}

export default AddResources;
