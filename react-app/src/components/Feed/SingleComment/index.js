import React, { useState } from 'react'
import { useEffect } from 'react';
import CommentOptionsModal from '../CommentOptions';
import CommentEditForm from './CommentEditForm';

const SingleComment = ({ comment, current_user, post }) => {
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="one-comment"
                        onMouseEnter={() => setShowCommentOptions(true)}
                        onMouseLeave={!modalOpen ? () => setShowCommentOptions(false) : () => null}>
      {/* <div className="one-comment"> */}
      <div><img className='comment-user-image' src={comment?.user.profile_image_url} alt="" /></div>
      <div className="full-comment">
        {!editClicked ? (
        <div>
          <div className="user-first-last">
            {comment?.user.first_name} {comment?.user.last_name}
          </div>
            <div className='comment-text'>{comment?.comment_content}</div>
        </div>
        ) : (
          <CommentEditForm current_user={current_user} post={post} setEditClicked={setEditClicked} editClicked={editClicked} comment={comment}/>
        )
      }
      </div>
      {current_user.id === comment?.user.id && (
        <div>
        {showCommentOptions === true && (
          <CommentOptionsModal setModalOpen={setModalOpen} editClicked={editClicked} setEditClicked={setEditClicked} post={post} comment={comment} />
        )
        }
      </div>
      )}
        </div>
    </div>
  )
}

export default SingleComment
