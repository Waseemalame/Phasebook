import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import DeletePost from "./DeletePost";


function DeletePostModal({ post }) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
      <div className="post-options-menu">
        <div className="edit-post-button" onClick={() => setShowModal(true)}>
          Delete
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePost post={post} />
        </Modal>
      )}
    </>
  );
}

export default DeletePostModal;
