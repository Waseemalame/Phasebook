import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import EditPostForm from "./EditPostForm";
import "./EditPostForm.css"
function EditPostModal({ post }) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
      <div className="post-options-menu">
        <div className="edit-post-button" onClick={() => setShowModal(true)}>
          Edit
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
