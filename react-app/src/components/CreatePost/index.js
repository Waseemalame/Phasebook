import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal } from "../context/Modal";
import CreatePostForm from "./CreatePostForm";
import "./CreatePostForm.css"
function CreatePostModal( ) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  useEffect(() => {
    const bodyEl = document.querySelector("body")
    console.log(showModal)
    if(showModal){
      // bodyEl.style = `overflow:hidden`
    } else {
      // bodyEl.style = 'overflow:scroll'

    }
  }, [showModal]);
  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }
  return (
    <>
      <div className="create-post-component">
        <div className="create-post-section">
        {user.profile_image_url ? (
          <img onClick={() => redirectProfile(user)} className="post-user-image" src={user.profile_image_url} alt="" />

          ) : (

            <img onClick={() => redirectProfile(user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
        )}
          <div className="create-post-click" onClick={() => setShowModal(true)}>
            <div className="create-field">
              What's on your mind, {user.first_name}?
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
