import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getComments } from '../../../store/comment';
import "./CommentView.css"
const CommentView = ({ post }) => {
  const comments = useSelector(state => Object.values(state.comments))
  console.log(comments)
  const postsComments = comments.filter(comment => comment.post === post.id)
  console.log(postsComments[postsComments.length - 1]?.comment_content)
  const dispatch = useDispatch()

  return (
    <div>
      {postsComments.length > 1 && (
        <p>View {postsComments.length} previous comments</p>

      )}
      <div className="one-comment">
        <div><img className='comment-user-image' src={postsComments[postsComments.length - 1]?.user.profile_image_url} alt="" /></div>
        <div className="full-comment">
          <div className="user-first-last">
            {postsComments[postsComments.length - 1]?.user.first_name} {postsComments[postsComments.length - 1]?.user.last_name}
          </div>
          <div className='comment-text'>{postsComments[postsComments.length - 1]?.comment_content}</div>
        </div>
      </div>

    </div>
  )
}

export default CommentView
