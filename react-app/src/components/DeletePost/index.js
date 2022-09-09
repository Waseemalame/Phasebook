import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import DeletePost from "./DeletePost";
import "./DeletePost.css"

function DeletePostModal({ post, setShowPostOptionsModal }) {
  // const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
        <div className="delete-post-button" onClick={() => setShowDeleteModal(true)}>
          Delete
        </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeletePost post={post} setShowPostOptionsModal={setShowPostOptionsModal} setShowDeleteModal={setShowDeleteModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePostModal;
