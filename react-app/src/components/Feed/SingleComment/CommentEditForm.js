import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../store/comment'
import "./CommentEditForm.css"
const CommentEditForm = ({ comment, post, current_user, setEditClicked, editClicked }) => {
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
  const onEnterPress = (e) => {

    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleCommentEdit(e)
    }

  }
  const escCancelEdit = (e) => {
    if(e.keyCode === 27){
      cancelEditComment()
    }
  }
  return (
    <form className="edit-comment-form" onSubmit={handleCommentEdit}>
    <textarea
          id="edit-comment-textarea"
          className='edit-form-input'

          // ref={ref}
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={
            (e) => {
              onEnterPress(e)
              escCancelEdit(e)
            }
          }
          autofocus
           />

    <button className='edit-form-btn' onClick={cancelEditComment} type="button">Cancel edit</button>
  </form>
  )
}

export default CommentEditForm
