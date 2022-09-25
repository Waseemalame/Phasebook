import React from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PostOptionsModal from '../PostOptions';
import Likes from '../Likes/Likes';


const OnePost = ({ post }) => {
  const current_user = useSelector(state => state.session.user)
  const history = useHistory();

  const redirectProfile = (user) => {
    window.scrollTo(0, 0)
    history.push(`/users/${user.id}`)
  }
  return (
    <>
<div className="post-user-info">
              <div>{post.user.profile_image_url ? (
                <img onClick={() => {
                  redirectProfile(post.user)}}
                  className="post-user-image"
                  src={current_user.id === post.user.id ? current_user.profile_image_url : post.user.profile_image_url} alt="" />
                    ) : (
                  <img onClick={() => redirectProfile(post.user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                )}</div>
              <ul>
                <li className='user-first-last'>{post.user?.first_name} {post.user?.last_name}</li>
                <li className='post-createdat'>{moment(post.created_at).fromNow()}</li>
              </ul>
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
            <Likes post={post} />
    </>
  )
}

export default OnePost
