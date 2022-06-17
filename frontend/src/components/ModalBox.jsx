import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../features/blog/blogSlice";
import Spinner from "./Spinner";

function ModalBox(props) {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.blog);

  const [modalState, setModalState] = useState("modal active");

  function refreshPage() {
    window.location.reload(false);
  }

  const closeModal = () => {
    setModalState("modal");
    refreshPage();
  };

  const deleteAction = (deleteType) => {
    switch (deleteType) {
      case "blog":
        dispatch(deleteBlog(props.id));
        alert("Blog deleted successfully!");

      default:
        refreshPage();
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="myModal" class={modalState}>
      <div class="modal-content">
        <span onClick={closeModal} class="close">
          &times;
        </span>
        <p>Do you wish you perform this action?</p>
        <p>
          Action: <span className="action-text">{props.action}</span>
        </p>

        <div className="buttons">
          <button
            onClick={() => deleteAction(props.deleteType)}
            className="yes"
          >
            yes
          </button>
          <button onClick={closeModal} className="no">
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
