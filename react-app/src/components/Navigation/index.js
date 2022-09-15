import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './Navigation.css'

const Navigation = ({ searchList, setSearchList}) => {
  const current_user = useSelector(state => state.session.user)

  const [searchString, setSearchString] = useState('');
  const [profileDropDown, setProfileDropDown] = useState(false);
  const history = useHistory()

  const searchUsers = () => {

  }
  const listRef = useRef()
  useEffect(() => {

    const closeSearchList = (e) => {
      if(searchList) return
      if(e.path[2] !== listRef.current){

        setSearchList(false)
      }

    }
    document.body.addEventListener("click", closeSearchList)

    return () => document.body.removeEventListener("click", closeSearchList)

  }, []);

  useEffect(() => {
    if(!profileDropDown) return;
    const closeProfileDropDown = () => {
      setProfileDropDown(false);
    }
    document.addEventListener("click", closeProfileDropDown);

    return () => document.removeEventListener("click", closeProfileDropDown);
  }, [profileDropDown]);

  const renderSearchList = () => {
    setSearchList(true)
  }
  const redirectHome = () => {
    history.push('/')
  }
  const redirectProfile = () => {
    history.push(`/users/${current_user.id}`)
  }
  const gitHubClick = () => {

  }
  const redirectFriendsList = () => {
    history.push(`/users/friends/${current_user.id}`)
  }

  return (
    <div className="nav-container">
      <ul className='nav-list'>
        <li className='search-nav'>
          <img onClick={redirectHome} id="logo" className={searchList ? 'hide-icon' : 'phasebook-icon'} src="https://i.imgur.com/XwPiQNW.png" alt=""/>

        </li>
        {/* <li className='search-nav'>
          <div onClick={() => setSearchList(true)}  ref={listRef} className={searchList === false ? 'nav-left' : 'nav-left-clicked'}>
            <img onClick={redirectHome} id="logo" className={searchList ? 'hide-icon' : ''} src="https://img.icons8.com/color/50/000000/facebook-new.png" alt=""/>
            <div onClick={() => setSearchList(true)} className="search-bar">
              <img src="https://img.icons8.com/fluency-systems-filled/15/000000/search.png" alt=""/>
              <input
                      onClick={() => setSearchList(true)}
                      className='search-input'
                      type="search"
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                      placeholder='Search Facebook' />
            </div>
            {searchList && (

              <UsersList setSearchList={setSearchList} searchString={searchString} />
            )}
          </div>
        </li> */}
        <li>
          <div className="nav-middle">
            {/* <img src="https://img.icons8.com/material-outlined/20/000000/home--v4.png" alt=""/> */}
            <a href="https://www.linkedin.com/in/waseemalame/"><img className='linkedin-icon' src="https://i.imgur.com/7rn4mNr.png" alt="linkedin"/></a>
            <a href="https://github.com/Waseemalame/Phasebook"><img className='github-icon' src="https://i.imgur.com/0Bc87qz.png" alt="github-phasedbook"/></a>

          </div>
        </li>
        <li>
          <div className="nav-right">
            {/* <img onClick={() => setProfileDropDown(true)} className='post-user-image' src={current_user?.profile_image_url} alt=""/> */}
            {current_user.profile_image_url ? (
          <img onClick={() => setProfileDropDown(true)} className="post-user-image" src={current_user.profile_image_url} alt="" />

          ) : (

            <img onClick={() => setProfileDropDown(true)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
        )}
            {/* <img onClick={redirectProfile} className='post-user-image' src={current_user?.profile_image_url} alt=""/> */}
          </div>
          {profileDropDown ? (
            <div className='profile-dropdown'>
              <div className='profile-click' onClick={redirectProfile}><strong>Profile</strong></div>
              <div className='friends-click' onClick={redirectFriendsList}><strong>Friends</strong></div>
              <LogoutButton />

            </div>
          ) : ''}
        </li>
      </ul>
    </div>
  )
}

export default Navigation
