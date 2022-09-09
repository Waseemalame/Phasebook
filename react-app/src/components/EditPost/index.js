import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import EditPostForm from "./EditPostForm";
import "./EditPostForm.css"
function EditPostModal({ post, setShowPostOptionsModal }) {
  // const dispatch = useDispatch();
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
        <div className="edit-post-button" onClick={() => setShowEditPostModal(true)}>
          Edit
        </div>
      {showEditPostModal && (
        <Modal onClose={() => setShowEditPostModal(false)}>
          <EditPostForm
             setShowEditPostModal={setShowEditPostModal}
             showEditPostModal={showEditPostModal}
             setShowPostOptionsModal={setShowPostOptionsModal}
             post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
