import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreatePostModal from '../CreatePost';
import CreatePostForm from '../CreatePost/CreatePostForm';
import "./ProfilePage.css"
function ProfilePage() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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

  if (!user) {
    return null;
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
            </div>
          </div>
        </div>
      </div>
        <div className="profile-body">
          Posts
        </div>
        <CreatePostModal />
    </div>
  );
}
export default ProfilePage;
