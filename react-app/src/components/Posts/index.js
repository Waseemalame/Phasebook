
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getLikesThunk } from "../../store/like"
import { getComments } from '../../store/comment';
import { getImagesThunk } from '../../store/image';
import { getPostsThunk } from '../../store/post';
import { getAllFriendsThunk } from '../../store/request';
import CommentView from '../CommentView';
import CreateCommentForm from '../CreateComment/CreateCommentForm';
import CreatePostModal from '../CreatePost';
import LikeComment from './LikeComment';
import OnePost from './OnePost';

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
    dispatch(getLikesThunk())

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
            <OnePost post={post}/>
            <LikeComment post={post} />
            <CommentView post={post} />
            <CreateCommentForm post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts
