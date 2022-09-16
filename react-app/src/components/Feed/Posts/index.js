
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getComments } from '../../../store/comment';
import { getImagesThunk } from '../../../store/image';
import { getPostsThunk } from '../../../store/post';
import { getAllRequestsThunk } from '../../../store/request';
import CreateCommentForm from '../../CreateComment/CreateCommentForm';
import CreatePostModal from '../../CreatePost';
import EditPostModal from '../../EditPost';
import Map, { WrappedMap } from '../../Map';
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
    dispatch(getAllRequestsThunk())

  }, [dispatch]);

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }


  return (
    <div className='main-feed'>
      <CreatePostModal />
      <span className='feed-posts'>
        {posts.reverse().map(post => (
          <div className="single-post">
            <div className="post-user-info">
              <div>{post.user.profile_image_url ? (
                <img onClick={() => redirectProfile(post.user)} className="post-user-image" src={post.user.profile_image_url} alt="" />

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
      </span>
      <WrappedMap
          googleMapURL={`googleMapURL=https://maps.googleapis.com/maps/api/js?key=AIzaSyCP2T7NfqmCm0aV62pHZazAMYDY7f_BnJg`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
    </div>
  )
}

export default Posts
