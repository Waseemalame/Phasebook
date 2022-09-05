import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import CreatePostForm from "./CreatePostForm";
import "./CreatePostForm.css"
function CreatePostModal( ) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
      <div className="create-post-component">
        <div className="create-post-section">
          <img className="post-user-image" src={user.profile_image_url} alt="" />
          <div className="create-post-click" onClick={() => setShowModal(true)}>
            <div className="create-field">
              What's on your mind, {user.first_name}?
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
