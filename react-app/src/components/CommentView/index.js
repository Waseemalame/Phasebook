import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SingleComment from '../EditComment';
import "./CommentView.css"
const CommentView = ({ post }) => {
  const current_user = useSelector(state => state.session.user)
  const comments = useSelector(state => Object.values(state.comments))
  const postsComments = comments.filter(comment => comment.post === post.id)

  const [showAllComments, setShowAllComments] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const lastComment = postsComments[postsComments.length - 1]
  const dispatch = useDispatch()

  if(postsComments.length < 1){
    return (
      ''
    )
  }

  if(postsComments.length === 1) {
    return (
      <div>
        <SingleComment
                  post={post}
                  comment={lastComment}
                  current_user={current_user}
                  setEditClicked={setEditClicked}
                  editClicked={editClicked}/>
      </div>
    )
  } else if(postsComments.length > 1 && showAllComments === false){
    return (
      <div>
      <p className='view-comment-text' onClick={() => setShowAllComments(true)}>View all {postsComments.length} comments</p>
      <SingleComment
                  post={post}
                  comment={lastComment}
                  current_user={current_user}
                  setEditClicked={setEditClicked}
                  editClicked={editClicked}/>
    </div>
    )
  } else if(postsComments.length > 1 && showAllComments === true){
    return (
      <div>
        <p className='collapse-comments' onClick={() => setShowAllComments(false)}>Collapse all comments</p>
        {postsComments.map(comment => (
          <div>
          <SingleComment
                  post={post}
                  comment={comment}
                  current_user={current_user}
                  setEditClicked={setEditClicked}
                  editClicked={editClicked}/>
          </div>
        ))}
      </div>
    )
  }
}

export default CommentView
