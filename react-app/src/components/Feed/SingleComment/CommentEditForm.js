import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../store/comment'
import "./CommentEditForm.css"
const CommentEditForm = ({ comment, post, current_user, setEditClicked, editClicked }) => {
const [commentContent, setCommentContent] = useState(comment?.comment_content);
const [errorValidators, setErrorValidators] = useState([]);

const [isFocused, setIsFocused] = useState(false);
const textAreaRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    let errors = []
    if(commentContent.length > 200){
      errors.push('Comment cannot be greater than 200 characters *')
      setErrorValidators(errors);
    } else if(commentContent.length < 1 || commentContent.trim().length === 0) {
      errors.push('Comment cannot be empty *')
      setErrorValidators(errors)
    }else {
      setErrorValidators([])
    }
  }, [commentContent.length])

  const addFocus = () => {
    if(editClicked){

      let editCommentField = document.getElementById('edit-comment-textarea');
      const end = editCommentField.value.length
      editCommentField.setSelectionRange(end, end)
      setIsFocused(true)

    }
    // setIsFocused(false)
  }
  const handleTextAreaClick = () => {
    let editCommentField = document.getElementById('edit-comment-textarea');
  }
  const removeFocus = () => {
    let editCommentField = document.getElementById('edit-comment-textarea');
    setIsFocused(false)

  }
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
      if(errorValidators.length === 0){
        handleCommentEdit(e)
      }
    }
  }

  const escCancelEdit = (e) => {
    if(e.keyCode === 27){
      cancelEditComment()
    }
  }
  const checkFocus = () => {
  }
  return (
    <form className="edit-comment-form" onSubmit={handleCommentEdit}>
      <ul className='edit-comment-errors'>{errorValidators.map(error =><li>{error}</li>)}</ul>

    <textarea
          id="edit-comment-textarea"
          className='edit-form-input'
          onClick={() => handleTextAreaClick()}
          // ref={textAreaRef}
          onFocus={addFocus}
          onBlur={removeFocus}
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={
            (e) => {
              onEnterPress(e)
              escCancelEdit(e)
            }
          }
          autoFocus
           />
    {isFocused ? (

      <button className='edit-form-btn' type="button">Press Esc to <span className='cancel-comment-edit' onClick={cancelEditComment}>cancel</span>.</button>
      ) : (

        <button className='edit-form-btn' type="button"><span className='cancel-comment-edit' onClick={cancelEditComment}>Cancel</span></button>
    )}
      <button disabled={errorValidators.length > 0} className='submit-comment-edit-btn' type="submit"><strong>Save</strong></button>

  </form>
  )
}

export default CommentEditForm
