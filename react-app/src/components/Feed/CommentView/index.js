import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getComments } from '../../../store/comment';
import LastComment from '../LastComment';
import SingleComment from '../SingleComment';
import "./CommentView.css"
const CommentView = ({ post }) => {
  const current_user = useSelector(state => state.session.user)
  const comments = useSelector(state => Object.values(state.comments))
  const postsComments = comments.filter(comment => comment.post === post.id)

  const [showAllComments, setShowAllComments] = useState(false);
  const lastComment = postsComments[postsComments.length - 1]
  const dispatch = useDispatch()

  return (
    <div>
      {postsComments.length > 1 && showAllComments === false ? (
        <p className='view-comment-text' onClick={() => setShowAllComments(true)}>View all {postsComments.length} comments</p>

      ) : (
        <div>
          {postsComments.length > 1 ? (
            <p className='collapse-comments' onClick={() => setShowAllComments(false)}>Collapse all comments</p>

          ) : (
            ''
          )}
        </div>

      )}
      <div className="all-comments">
        {showAllComments === true && postsComments.map((comment, index) => (
                <SingleComment
                          comment={comment}
                          current_user={current_user}/>
        ))}
      </div>
          {/* <LastComment
                    lastComment={lastComment}
                    current_user={current_user} /> */}

    </div>
  )
}

export default CommentView
