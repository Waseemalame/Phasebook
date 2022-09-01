import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../../store/comment';
import { getPostsThunk } from '../../store/post';
import './CreateCommentForm.css';

const CreateCommentForm = ({ post }) => {
const [commentContent, setCommentContent] = useState('');
const [errorValidators, setErrorValidators] = useState([]);
const updateComment = (e) => setCommentContent(e.target.value);

const dispatch = useDispatch()
const userSession = useSelector(state => state.session.user)


let errors = [];

  const commentSubmit = async(e) => {
    e.preventDefault();
    const data = {
      comment_content: commentContent,
      post_id: post.id,
      user_id: userSession.id
    }

    let newComment = await dispatch(createComment(data))
    if(commentContent.length === 0){
      errors.push('Your comment needs at least one character')
      setErrorValidators(errors);
    }

    dispatch(getComments(post.id))
    dispatch(getPostsThunk())

    setCommentContent('')
    return newComment
  }

  return (

    <div className="create-comment-container">
      <img className='comment-user-image' src={userSession.profile_image_url} alt="" />
      <form className="comment-form" onSubmit={commentSubmit}>
        <ul>{errorValidators.map(error =><li>{error}</li>)}</ul>
          <input type="text"
          className='comment-input'
             value={commentContent}
             onChange={updateComment}
             placeholder='Write a comment...'
             required />
      {/* <button type="submit">Post</button> */}
        </form>
    </div>
  )
}

export default CreateCommentForm
