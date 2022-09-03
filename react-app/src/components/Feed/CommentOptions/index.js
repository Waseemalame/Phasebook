import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import CommentOptions from "./CommentOptions";
// import EditCommentForm from "../../EditCommentForm";

function CommentOptionsModal({ editClicked, setEditClicked }) {
  // const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    if(editClicked === true && showModal === true){
      setShowModal(false)
    }
  }, [editClicked, showModal]);
  return (
    <>

          <i onClick={editClicked === false ? () => setShowModal(true) : null} className="fa-solid fa-ellipsis edit-comment-ellipsis"></i>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <EditCommentForm setShowModal={setShowModal} setEditClicked={setEditClicked} user={user} onClick={() => setShowModal(false)}/> */}
          <CommentOptions editClicked={editClicked} setShowModal={setShowModal} setEditClicked={setEditClicked} user={user} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CommentOptionsModal;
