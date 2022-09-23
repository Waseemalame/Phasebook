
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getComments } from '../../../store/comment';
import { getImagesThunk } from '../../../store/image';
import { getPostsThunk } from '../../../store/post';
import { getAllFriendsThunk } from '../../../store/request';
import { useMessageContext } from '../../context/messageContext';
import CreateCommentForm from '../../CreateComment/CreateCommentForm';
import CreatePostModal from '../../CreatePost';
import EditPostModal from '../../EditPost';
import PostOptionsModal from '../../PostOptions';
import CommentView from '../CommentView';

import './Posts.css'
const Posts = () => {

  const dispatch = useDispatch()

  const posts = useSelector(state => Object.values(state.posts))
  const history = useHistory()
  const current_user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getComments())
    dispatch(getImagesThunk())
    dispatch(getAllFriendsThunk())

  }, [dispatch]);

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }


  return (
    <div className='main-feed'>
      <CreatePostModal />
      <div className='feed-posts'>
        {posts && posts.reverse().map(post => (
          <div id={`feed${post.id}`} className="single-post">
            <div className="post-user-info">
              <div>{post.user.profile_image_url ? (
                <img onClick={() => {
                  redirectProfile(post.user)
                }} className="post-user-image" src={post.user.profile_image_url} alt="" />

                    ) : (

                <img onClick={() => redirectProfile(post.user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
        )}</div>
              <span className='user-first-last'>{post.user?.first_name} {post.user?.last_name}</span>
            </div>
            {current_user.id === post.user.id ? (
                <PostOptionsModal post={post} />

              ) : (
                ''
              )}
            <div className='post-content'>{post.content}</div>
            <div className="post-images">
              <img className='single-post-image' src={post?.images[0]?.image_url} alt="" />
            </div>
            <div className="post-underline"></div>
            <CommentView post={post} />
            <CreateCommentForm post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts
