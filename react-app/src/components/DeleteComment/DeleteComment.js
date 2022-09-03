import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteComment } from "../../store/comment"
import "./DeleteComment.css"
const DeleteComment = ({ post, comment, setShowModal, setShowOptionsModal }) => {
  const dispatch = useDispatch()

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment.id, post.id))
    setShowModal(false)
    setShowOptionsModal(false)
  }
  return (
    <div className="confirm-del-container">
    <div className="del-header">
      <h3>Delete Comment?</h3>
    </div>
    <p className="del-text">Are you sure you want to delete this comment?</p>
    <div className="delete-options">
      <h4 className="no-delete" onClick={
        () => {
          setShowOptionsModal(false)
          setShowModal(false)
        }
      }>No</h4>
      <h4 className="yes-delete" onClick={handleDeleteComment}>Delete</h4>
    </div>
    </div>
  )
}

export default DeleteComment
