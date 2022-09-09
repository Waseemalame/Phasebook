import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import PostOptions from "./PostOptions";
const PostOptionsModal = ({ post }) => {
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowPostOptionsModal(true)}>
        <i className="fa-solid fa-ellipsis edit-post-ellipsis"></i>
      </div>
      {showPostOptionsModal && (
        <Modal onClose={() => setShowPostOptionsModal(false)}>
          <PostOptions setShowPostOptionsModal={setShowPostOptionsModal} post={post} />
        </Modal>
      )}
    </>
  )
}

export default PostOptionsModal
