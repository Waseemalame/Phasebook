import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { acceptFriendRequestThunk, createFriendRequestThunk, deleteFriendThunk, getUserFriendsThunk } from '../../store/friend';
import { getPostsThunk } from '../../store/post';
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
  const friends = useSelector(state => state.friends.friends)
  const friendRequests = useSelector(state => (state.friends.friendships))
  const history = useHistory()
  const dispatch = useDispatch()
  const usersPosts = posts.filter(post => post.user.id === user.id)

  const [requestSent, setRequestSent] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);


  useEffect(() => {

    if(!isFriend){

      friendRequests?.forEach(request => {
        if(user.id === request?.user2_id){
          setRequestSent(true)
        } else if(user.id === request?.user1_id){
          setRequestPending(true)
          setRequestId(request.id)
        }
      })
    }


  }, [friendRequests, friends, user.id, requestPending, requestId, isFriend, current_user, isDeleted]);

  useEffect(() => {
    if(isDeleted){
      setIsFriend(false)
    }
  }, [isDeleted]);
  useEffect(() => {


    friends?.forEach(friend => {
      if(user.id === friend?.user2_id || user.id === friend?.user1_id){
        setIsFriend(true)
      } else {
        setIsFriend(false)
      }
    })
    console.log(isFriend)

  });
  // useEffect(() => {
  // }, [dispatch, current_user.id]);

  const checkIsFriend = () => {

  }

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
    console.log(user.id)
  }, [user]);

  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getUserFriendsThunk(current_user.id))
  }, [dispatch, current_user]);

  if (!user) {
    return null;
  }

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }

  const sendFriendRequest = () => {
    const data = {
      user1_id: current_user.id,
      user2_id: user.id,
      status: "pending"
    }
    dispatch(createFriendRequestThunk(data))
  }
  const cancelFriendRequest = () => {

  }
  const approveFriendRequest = async () => {

    const data = {
      id: requestId,
      user1_id: user.id,
      user2_id: current_user.id,
      status: 'accepted'
    }

    const updatedRequest = await dispatch(acceptFriendRequestThunk(data))
    setIsFriend(true)
    if(updatedRequest){
      // dispatch(getUserFriendsThunk(current_user.id))
    }
  }
  const deleteFriend = () => {
    console.log(requestId)
    dispatch(deleteFriendThunk(requestId))
    dispatch(getUserFriendsThunk(current_user.id))
    setIsDeleted(true)

  }

  return (
    // <ul>
    //   <li>
    //     <strong>User Id</strong> {userId}
    //   </li>
    //   <li>
    //     <strong>Username</strong> {user.username}
    //   </li>
    //   <li>
    //     <strong>Email</strong> {user.email}
    //   </li>
    //   <LogoutButton />
    // </ul>
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
            </div>
            <div className="profile-top-underline">
            <div>
            {isFriend && current_user.id !== user.id && (
                <div onClick={deleteFriend} className="friend-request-btn">Remove Friend</div>

                  )}
                {current_user.id !== user.id && (

                  <div>
                {requestPending && !isFriend && (
                  <div onClick={approveFriendRequest} className="friend-request-btn">Approve Friend</div>
                  )}
              </div>
                )}
            </div>
              {(current_user.id !== user.id && !isFriend && !requestPending) && (

                <div className="friend-request-section">
                  {!isFriend && (
                <div>
                  {requestSent ? (
                    <div onClick={cancelFriendRequest} className="friend-request-btn">Cancel Request</div>
                    ) : (
                      <div onClick={sendFriendRequest} className="friend-request-btn">Add Friend</div>
                  )}
                </div>

                  )}

              </div>
              )}


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
  );
}

export default ProfilePage;
