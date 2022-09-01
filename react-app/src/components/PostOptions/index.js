import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import PostOptions from "./PostOptions";
const PostOptionsModal = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-ellipsis edit-post-ellipsis"></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostOptions post={post} />
        </Modal>
      )}
    </>
  )
}

export default PostOptionsModal
