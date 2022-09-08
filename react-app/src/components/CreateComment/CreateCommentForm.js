import React, { useState } from 'react'
import { useEffect } from 'react';
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


// let errors = [];
  useEffect(() => {
    let errors = []
    if(commentContent.length > 200){
      errors.push('Comment cannot be greater than 200 character')
      setErrorValidators(errors);
    } else {
      setErrorValidators([])
    }
  }, [commentContent.length])
  const commentSubmit = async(e) => {
    e.preventDefault();
    const data = {
      comment_content: commentContent,
      post_id: post.id,
      user_id: userSession.id
    }

    let newComment = await dispatch(createComment(data))


    dispatch(getComments(post.id))
    dispatch(getPostsThunk())

    setCommentContent('')
    setErrorValidators([])
    return newComment
  }


  return (

    <div className="create-comment-container">
      {/* <img className='comment-user-image' src={userSession.profile_image_url} alt="" /> */}
      {userSession.profile_image_url ? (
          <img className="comment-user-image" src={userSession.profile_image_url} alt="" />

          ) : (

            <img className="comment-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
        )}
      <form className="comment-form" onSubmit={commentSubmit}>
        <ul className='create-comment-errors'>{errorValidators.map(error =><li>{error}</li>)}</ul>
          <input type="text"
          className='comment-input'
             value={commentContent}
             onChange={updateComment}
             placeholder='Write a comment...'
             required />
      <button disabled={errorValidators.length > 0} className='submit-comment-btn' type="submit"><strong>Submit</strong></button>
        </form>
    </div>
  )
}

export default CreateCommentForm
