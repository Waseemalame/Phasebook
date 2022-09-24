import React from 'react'
import { useEffect } from 'react'
import { useMultiContext } from '../../context/multiContext'
const LikeComment = ({ post }) => {
  const { commentBtnClicked, setCommentBtnClicked } = useMultiContext();
  const cmtInput = document.getElementById(`${post.id}-comment-input`)
  return (
    <div className='like-comment-section'>
      <div className="click-like">
        <img className='like-icon' src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/18/000000/external-like-feedback-kmg-design-detailed-outline-kmg-design.png" alt=""/>
        <span className='like-icon-text'>Like</span>
        </div>
      <div className="click-comment" onClick={() => cmtInput.focus()}>
        <img className='comment-icon' src="https://img.icons8.com/ios/18/000000/comments.png" alt=""/>
        <span className="comment-icon-text">Comment</span>
        </div>
    </div>
  )
}

export default LikeComment
