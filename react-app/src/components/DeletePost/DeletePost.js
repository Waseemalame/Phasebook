import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePostThunk } from '../../store/post'

const DeletePost = ({ post }) => {
  const dispatch = useDispatch();
  const handleDeletePost = () => {
    dispatch(deletePostThunk(post.id))
  }
  return (
    <div>
      Are you sure you want to delete this post?
      <div onClick={handleDeletePost}>Yes</div>
      <div>No</div>
    </div>
  )
}

export default DeletePost
