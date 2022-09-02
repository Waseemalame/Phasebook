import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../store/comment'
import "./CommentEditForm.css"
const CommentEditForm = ({ comment, post, current_user, setEditClicked }) => {
const [commentContent, setCommentContent] = useState(comment?.comment_content);

  const dispatch = useDispatch()

  const handleCommentEdit = (e) => {
    e.preventDefault()
    const data = {
      comment_content: commentContent,
      post_id: post.id,
      user_id: current_user.id

    }
    dispatch(updateComment(data, comment.id))
    setEditClicked(false)

  }
  const cancelEditComment = () => {
    setEditClicked(false)
  }
  return (
    <form className="edit-comment-form" onSubmit={handleCommentEdit}>
    <input
          className='edit-form-input'
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)} />
    <button className='edit-form-btn' onClick={cancelEditComment} type="button">Cancel</button>
  </form>
  )
}

export default CommentEditForm
