import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPostsThunk } from '../../store/post';
import { createRequestThunk, deleteRequestThunk, getAllRequestsThunk, updateFriendRequestThunk } from '../../store/request';
import { authenticate } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import CreateCommentForm from '../CreateComment/CreateCommentForm';
import CreatePostModal from '../CreatePost';
import CreatePostForm from '../CreatePost/CreatePostForm';
import CommentView from '../Feed/CommentView';
import PostOptionsModal from '../PostOptions';

import "./ProfilePage.css"
function ProfilePage() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const current_user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const history = useHistory()
  const dispatch = useDispatch()
  const usersPosts = posts.filter(post => post.user.id === user.id)
  const requests = useSelector(state => Object.values(state.friendRequests))
  const [status, setStatus] = useState('');
  const [one_request, setOne_request] = useState(undefined);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    if(requests){
      const user_id = parseInt(userId)
      let oneRequest;
        oneRequest = requests.filter(request => {
          return (request.recipient_id === user_id || request.sender_id === user_id) &&
          (request.recipient_id === current_user.id || request.sender_id === current_user.id)
        })
        if(oneRequest[0]){
          setStatus(oneRequest[0].status)
          setOne_request(oneRequest[0])
        } else {
          setStatus('')
        }
    }
  }, [requests, current_user, userId]);

  useEffect(() => {
    dispatch(getAllRequestsThunk())
  }, [userId, dispatch]);


  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }
  const createRequest = () => {
    const data = {
      sender_id: current_user.id,
      recipient_id: user.id,
      status: "pending"
    }
    dispatch(createRequestThunk(data))
    dispatch(getAllRequestsThunk())
  }
  const updateRequest = async () => {
    const data = {
      id: one_request.id,
      sender_id: userId,
      recipient_id: current_user.id,
      status: 'accepted'
    }
    const updatedReq = await dispatch(updateFriendRequestThunk(data))
    if(updatedReq){

    }

    setStatus('accepted')
    if(updatedReq){
      dispatch(authenticate());
    }
  }
  const deleteRequest = async () => {
    if(!one_request){
    } else {
      const deletedReq = await dispatch(deleteRequestThunk(one_request.id))
      setStatus('')

        dispatch(authenticate());


    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-top">
          <div className="cover-photo-container">
            <div className="edit-cover-photo">
            </div>
          </div>
          <div className="user-profile-header">
            <div className="users-name-image">
              <div className="profile-user-image">
                {user.profile_image_url ? (
                  <img className='profile-image' src={user.profile_image_url} alt="" />
                ) : (
                  <img className='profile-image' src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jvAgaOmK2RAAX_4kkp6&_nc_ht=scontent-lax3-1.xx&oh=00_AT_MK_StZzlT1-HqibhO9GFRjxGQA9w3wR6h8Ltolictug&oe=633D2A78" alt="" />
                )}
              </div>
            </div>
            <div className="profile-users-name">
              <span><strong>{user?.first_name} {user.last_name}</strong></span>
              {current_user.id !== user.id && (
               <div>
                <div>{status === 'accepted' && (
                  <button className='friend-btn' onClick={deleteRequest}>Remove friend</button>
                )}
                </div>
                <div>{(status === 'pending' && one_request?.recipient_id !== current_user.id) && (
                  <button className='friend-btn' onClick={deleteRequest}>Cancel request</button>
                )}
                </div>
                <div>{(status === 'pending' && one_request?.recipient_id === current_user.id) && (
                  <button className='friend-btn' onClick={updateRequest}>Approve request</button>
                )}
                </div>
                <div>{status === '' && (
                  <button className='friend-btn' onClick={createRequest}>Add friend</button>
                )}
                </div>
              </div>
              )}

            </div>
            <div className="profile-top-underline">
            </div>
          </div>
        </div>
      </div>
        <div className="profile-body">
          {usersPosts.length > 0 ? 'Posts' : 'No Posts Created'}
        </div>
        {/* <CreatePostModal /> */}
        <div className='feed-posts'>

        {usersPosts && usersPosts.reverse().map(post => (
          <div className="single-post">
            <div className="post-user-info">
              <div>{post.user.profile_image_url ? (
                <img onClick={() => redirectProfile(post.user)} className="post-user-image" src={post.user.profile_image_url} alt="" />

                    ) : (

                <img onClick={() => redirectProfile(post.user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                    )}
              </div>
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
  );
}

export default ProfilePage;
