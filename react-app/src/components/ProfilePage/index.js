import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPostsThunk } from '../../store/post';
import { deleteRequestThunk, getAllFriendsThunk, updateFriendRequestThunk } from '../../store/request';
import { useProfileContext } from '../context/profileContext';
import CreateCommentForm from '../CreateComment/CreateCommentForm';
import CreatePostModal from '../CreatePost';
import CreatePostForm from '../CreatePost/CreatePostForm';
import CommentView from '../CommentView';
import FriendsList from '../Friends/FriendList';
import ShowFriends from '../Friends/ShowFriends';
import PostOptionsModal from '../PostOptions';
import EditProImg from './EditProImg';

import "./ProfilePage.css"
import OnePost from '../Posts/OnePost';
import LikeComment from '../Posts/LikeComment';

function ProfilePage() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const current_user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const history = useHistory()
  const dispatch = useDispatch()
  const usersPosts = posts.filter(post => post.user.id === user.id)
  const [status, setStatus] = useState('');
  const [one_request, setOne_request] = useState('');
  const [mutualFriends, setMutualFriends] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [currUserProfile, setCurrUserProfile] = useState(false);
  const { clickedFriends, setClickedFriends, clickedPosts, setClickedPosts, scrollToFriends, setProfileImgPreview, profileImgPreview, proImgUpdated } = useProfileContext()
  const scrollRef = useRef()
  // Find User
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {

      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      if(current_user.id === user.id){
        setUser(current_user)
        setProfileImgPreview('')
      } else {
        setUser(user);
      }

    })();

  }, [userId, current_user]);

  // Find Mutual Friends with Profile Owner
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/mutualfriends/${userId}`);
      const responseData = await response.json();
      setMutualFriends(responseData.users);
    })();

  }, [userId]);
  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch]);
  // let postsEl = document.querySelector(".profile-post-header")
  let postsEl = document.querySelector("#post-header")
  let friendsEl = document.querySelector("#friends-header")

  useEffect(() => {
    if(scrollToFriends){
      scrollRef.current.scrollIntoView()

    }
    if(current_user.id !== user.id){
      setProfileImgPreview('')
    }
    scrollRef.current.focus()
  }, []);


  const postsClick = () => {
    if(friendsEl && clickedFriends){
      setClickedFriends(false)
      setClickedPosts(true)
    }
    setTimeout(() => {
      if(postsEl){
        if(clickedPosts){
          window.scrollBy({
            top: -500,
            behavior: 'smooth'
          })
        }
      }
    }, 500)
  }

  const friendsClick = () => {
    scrollRef.current.scrollIntoView()
    if(friendsEl){
      if(clickedFriends){
        setTimeout(() => {
          window.scrollBy({
            top: -500,
            behavior: 'smooth'
          })
        }, 500)
      }
      if(postsEl){
        if(clickedPosts){
          setClickedFriends(true)
          setClickedPosts(false)
        }
      }
    }
  }

  const user_id = parseInt(userId)
  useEffect(() => {

        (async () => {
          if(user_id === current_user.id) return;
          const response = await fetch(`/api/requests/profile/${user_id}`);
          const oneRequest = await response.json();
          if(Object.values(oneRequest).length < 1){
            setStatus('')
            setOne_request('')
          } else {
            setStatus(oneRequest.status)
            setOne_request(oneRequest);
          }
        })();


  }, [current_user, user_id, accepted]);


  if (!user) {
    return null;
  }

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }

  const createRequest = async () => {
    const formData = new FormData()
    formData.append("sender_id", current_user.id)
    formData.append("recipient_id", user.id)
    formData.append("status", "pending")
    const res = await fetch(`/api/requests`, {
      method: 'POST',
      body: formData
    })
    const result = await res.json()
    setOne_request(result.one_request)
    setStatus('pending')
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
    setAccepted(true)
    setStatus('accepted')
    dispatch(getAllFriendsThunk())
  }

  const deleteRequest = async () => {
    if(status === 'accepted') {

      const data = {
        requestId: one_request.id,
        userId: user_id
      }
      const deletedFriend = await dispatch(deleteRequestThunk(data))
      setOne_request('')
      setDeleted(true)
      setStatus('')
      dispatch(getAllFriendsThunk())
    }
    else if(status !== 'accepted'){
      const res = await fetch(`/api/requests/${one_request.id}/${user_id}`, {
        method: "DELETE"
      })
      if (res.ok){
        setStatus('')
      }
    }
  }



  return (
    <div className="profile-page">
      <div className="profile-top-container">
        <div className="profile-container">
          <div className="profile-top">
            <div className="cover-photo-container">
              <div className="edit-cover-photo">
              </div>
            </div>
            <div ref = {scrollRef} className="user-profile-header">
              <div className="users-name-image">
                <div className="profile-user-info">
                  <>
                  {(profileImgPreview && current_user.id === user.id) ? (

                    <img className='profile-image-preview' src={profileImgPreview} alt="" />
                    ) : (
                      <>
                      {user.profile_image_url ? (
                        <img className='profile-image' src={user.profile_image_url} alt="" />
                        ) : (
                          <img className='profile-image' src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jvAgaOmK2RAAX_4kkp6&_nc_ht=scontent-lax3-1.xx&oh=00_AT_MK_StZzlT1-HqibhO9GFRjxGQA9w3wR6h8Ltolictug&oe=633D2A78" alt="" />
                          )}
                      </>
                      )}
                      {current_user.id === user.id && (
                        <EditProImg user={user} />
                      )}
                  </>
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
          </div>
        </div>
      </div>
        <div className="profile-body">
            <span id="post-header"
                  onClick={postsClick}
                  className={!clickedPosts ? 'profile-post-header' : 'profile-post-header-active'}>Posts</span>
            <span id="friends-header"
                  onClick={friendsClick}
                  className={!clickedFriends ? 'profile-friends-header' : 'profile-post-header-active'}>Friends</span>
        </div>
      </div>
        {clickedFriends && <ShowFriends
                            user={user}
                            setClickedPosts={setClickedPosts}
                            setClickedFriends={setClickedFriends}
                            mutualFriends={mutualFriends}
                            setAccepted={setAccepted}
                            setDeleted={setDeleted}
                            deleted={deleted}
                            accepted={accepted}
                            setMutualFriends={setMutualFriends}
                            />}
        {clickedPosts && (
          <div className="profile-lower">
          <div className="friends-list-container">
            <FriendsList user={user}
                         mutualFriends={mutualFriends}
                         accepted={accepted}
                         deleted={deleted}
                         setAccepted={setAccepted}
                         setDeleted={setDeleted}
                         />
          </div>
          <div>
          {usersPosts && usersPosts.reverse().map(post => (
          <div id={`feed${post.id}`} className="single-post">
            <OnePost post={post}/>
            <LikeComment post={post} />
            <CommentView post={post} />
            <CreateCommentForm post={post} />
          </div>
        ))}
        </div>
      </div>
          )}
    </div>
  );
}

export default ProfilePage;
