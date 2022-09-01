
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPostsThunk } from '../../../store/post';
import CreateCommentForm from '../../CreateComment/CreateCommentForm';
import CreatePostModal from '../../CreatePost';
import EditPostModal from '../../EditPost';
import PostOptionsModal from '../../PostOptions';
import './Posts.css'

const Posts = () => {

  const dispatch = useDispatch()

  const posts = useSelector(state => Object.values(state.posts))
  console.log(posts)

  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch]);


  return (
    <div className='main-feed'>
      <CreatePostModal />
      <span className='feed-posts'>
        {posts.map(post => (
          <div className="single-post">
            <div className="post-user-info">
              <div><img className='post-user-image' src={post.user.profile_image_url} alt="" /></div>
              <span className='user-first-last'>{post.user.first_name} {post.user.last_name}</span>
            </div>
              <PostOptionsModal post={post} />
            <div className='post-content'>{post.content}</div>
            <CreateCommentForm post={post} />
          </div>
        ))}
      </span>
    </div>
  )
}

export default Posts
