
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPostsThunk } from '../../../store/post';
import CreatePostModal from '../../CreatePost';
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
              <div className="post-firstname">{post.user.first_name}</div>
              <div className="post-username">{post.user.last_name}</div>
            </div>
            <div className='post-content'>{post.content}</div>
          </div>
        ))}
      </span>
    </div>
  )
}

export default Posts
