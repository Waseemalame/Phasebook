import React, { useState } from 'react'

const SingleComment = ({ comment, current_user }) => {
  const [showCommentOptions, setShowCommentOptions] = useState(false);

  return (
    <div>
      <div className="one-comment" onMouseEnter={() => setShowCommentOptions(true)} onMouseLeave={() => setShowCommentOptions(false)}>
      <div><img className='comment-user-image' src={comment?.user.profile_image_url} alt="" /></div>
      <div className="full-comment">
        <div className="user-first-last">
          {comment?.user.first_name} {comment?.user.last_name}
        </div>
          <div className='comment-text'>{comment?.comment_content}</div>
      </div>
      {current_user.id === comment?.user.id && (
        <div>
        {showCommentOptions === true && (
          <i className="fa-solid fa-ellipsis edit-comment-ellipsis"></i>
        )
        }
      </div>
      )}
        </div>
    </div>
  )
}

export default SingleComment
