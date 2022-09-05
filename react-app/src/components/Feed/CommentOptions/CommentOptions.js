import React from 'react'
import { useEffect } from 'react'
import "./CommentOptions.css"

import DeleteCommentModal from '../../DeleteComment';

const CommentOptions = ({setShowOptionsModal, editClicked, setEditClicked, user, post, comment}) => {
  useEffect(() => {
  }, [editClicked]);

  return (
    <div className='comment-options-container'>
      <div onClick={() => setEditClicked(true)}>Edit</div>
      <DeleteCommentModal setShowOptionsModal={setShowOptionsModal} post={post} comment={comment} />
    </div>
  )
}

export default CommentOptions
