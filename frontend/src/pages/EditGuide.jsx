import React, { useState, useEffect } from "react";
import { FaPen, FaFastBackward } from "react-icons/fa";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import parser from "html-react-parser";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGuideByGuideId, editGuide } from "../features/guide/guideSlice";

function EditGuide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { viewingGuide, isError, isLoading, message } = useSelector(
    (state) => state.guide
  );

  const guideId = localStorage.getItem("viewGuideId");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGuideByGuideId(guideId));

    if (isError) {
      alert(message);
    }
  }, [user, navigate, dispatch, isError, message]);

  //content of the rich text editor
  const [text, setText] = useState(viewingGuide.content);
  const [preview, setPreview] = useState(false);

  const togglePreview = () => {
    setPreview(!preview);
  };

  const handleTextChange = (event, editor) => {
    const data = editor.getData();
    setText(data);
  };

  const navigateMyGuide = () => {
    navigate("/myGuide");
  };

  const handleEditGuide = (event) => {
    event.preventDefault();
    let body = {
      id: guideId,
      content: text,
    };

    if(body.content){
      dispatch(editGuide(body))

      if(!isError){
        alert('Guide edited successfully!')
        navigate('/myGuide')
      }
    }else{
      alert('do not leave the content empty')
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {viewingGuide ? (
        <section className="create-guide">
          <div className="heading">
            <FaPen />
            <h1>Edit Guide Content</h1>
          </div>

          <form>
            <div className="input-field">
              <h3>Enter a title for your guide</h3>
              <input
                type="text"
                value={viewingGuide ? viewingGuide.name : ""}
                disabled
              />
            </div>

            {/* Rich text editor here */}
            <div className="rich-text-editor">
              <h3>Guide Content</h3>
              <CKEditor
                className="ck-editor"
                editor={ClassicEditor}
                data={text}
                onChange={handleTextChange}
              />
            </div>

            <div className="preview">
              <h3 onClick={togglePreview} className="preview-wording">
                Click to Preview
              </h3>
              {preview ? (
                <>
                  <h1 className="title">{viewingGuide.name}</h1>
                  {text ? parser(text) : ""}
                </>
              ) : (
                ""
              )}
            </div>

            <div className="input-field">
              <h3>Choose a subtopic for your guide</h3>
              <select name="blogCategory" disabled>
                <option value={viewingGuide.subtopic.id}>
                  {viewingGuide.subtopic.name}
                </option>
              </select>
            </div>

            {viewingGuide.guideQuestions &&
              viewingGuide.guideQuestions.map((element) => (
                <div className="input-field">
                  <h3>Question to Audience</h3>
                  <input type="text" value={element.question} disabled />
                  <h3>Answer</h3>
                  <input type="text" value={element.answer} disabled />
                </div>
              ))}

            <button onClick={handleEditGuide} className="btn">
              Edit Guide
            </button>
          </form>

          <button onClick={navigateMyGuide} className="back-btn">
            <FaFastBackward /> Select other guides
          </button>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditGuide;
