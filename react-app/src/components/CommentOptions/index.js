import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../context/Modal";
import CommentOptions from "./CommentOptions";
// import EditCommentForm from "../../EditCommentForm";

function CommentOptionsModal({ editClicked, setEditClicked, comment, post, setModalOpen }) {
  // const dispatch = useDispatch();

  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    if(editClicked === true && showOptionsModal === true){
      setShowOptionsModal(false)
    }
    if(showOptionsModal === true){
      setModalOpen(true)
    }
  }, [editClicked, showOptionsModal]);
  return (
    <>
          {!editClicked && (
            <i onClick={editClicked === false ? () => setShowOptionsModal(true) : null} className="fa-solid fa-ellipsis edit-comment-ellipsis"></i>
          )}

      {showOptionsModal && (
        <Modal onClose={() => setShowOptionsModal(false)}>
          {/* <EditCommentForm setShowOptionsModal={setShowOptionsModal} setEditClicked={setEditClicked} user={user} onClick={() => setShowOptionsModal(false)}/> */}
          <CommentOptions post={post} comment={comment} editClicked={editClicked} setShowOptionsModal={setShowOptionsModal} setEditClicked={setEditClicked} user={user} onClick={() => setShowOptionsModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CommentOptionsModal;
