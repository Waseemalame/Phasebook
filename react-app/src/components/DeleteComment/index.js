import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import DeleteComment from "./DeleteComment";
import "./DeleteComment.css"
function DeleteCommentModal({ editClicked, setEditClicked, post, comment, setShowOptionsModal }) {
  // const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>
          {!editClicked && (
            <button onClick={() => setShowModal(true)} className="delete-comment-btn">Delete</button>
          )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteComment post={post} comment={comment} setShowModal={setShowModal} setShowOptionsModal={setShowOptionsModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
