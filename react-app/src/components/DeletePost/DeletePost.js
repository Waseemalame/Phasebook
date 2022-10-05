import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePostThunk } from '../../store/post'

const DeletePost = ({ post, setShowDeleteModal, setShowPostOptionsModal }) => {
  const dispatch = useDispatch();
  const handleDeletePost = () => {
    dispatch(deletePostThunk(post.id))
    setShowPostOptionsModal(false)
    setShowDeleteModal(false)
  }
  return (
    <div>
      <div className="confirm-del-container">
        <div className="del-header">
        <h3>Delete Post?</h3>
      </div>
    <p className="del-text">Are you sure you want to delete this post?</p>
    <div className="delete-options">
      <h4 className="no-delete" onClick={
        () => {
          setShowPostOptionsModal(false)
          setShowDeleteModal(false)
        }
      }>No</h4>
      <h4 className="yes-delete" onClick={handleDeletePost}>Delete</h4>
    </div>
    </div>
    </div>
  )
}

export default DeletePost
