import React, { useState } from 'react'
import CommentOptionsModal from '../CommentOptions';

const LastComment = ({ lastComment, current_user, setEditClicked, editClicked }) => {
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  return (
    <div className="one-comment"
      onMouseEnter={() => setShowCommentOptions(true)}
      onMouseLeave={() => setShowCommentOptions(false)}>
      <div><img className='comment-user-image' src={lastComment?.user.profile_image_url} alt="" /></div>
      <div className="full-comment">
       <div className="user-first-last">
         {lastComment?.user.first_name} {lastComment?.user.last_name}
       </div>

         <div className='comment-text'>{lastComment?.comment_content}</div>


      </div>
      {current_user.id === lastComment?.user.id && (

       <div>
       {showCommentOptions === false ? (
         ''
         ) :
         <CommentOptionsModal editClicked={editClicked} setEditClicked={setEditClicked} />

       }
      </div>
      )}
</div>
  )
}

export default LastComment
