import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useProfileContext } from '../context/profileContext';
import UsersList from './UsersList';
import './Navigation.css'
const Navigation = () => {
  const current_user = useSelector(state => state.session.user)
  const { setClickedFriends, setScrollToFriends, setClickedPosts } = useProfileContext()
  const [searchString, setSearchString] = useState('');
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const history = useHistory()

  const listRef = useRef()
  useEffect(() => {
    if(!profileDropDown) return;
    const closeProfileDropDown = () => {
      setProfileDropDown(false);
    }
    document.body.addEventListener("click", closeProfileDropDown);

    return () => document.body.removeEventListener("click", closeProfileDropDown);
  }, [profileDropDown]);

  useEffect(() => {

    const closeSearchList = (e) => {
      e.stopPropagation()
      if(searchList) return
      if(e.path[2] !== listRef.current){
        setSearchList(false)
        setSearchString('')
      }
    }
    document.body.addEventListener("click", closeSearchList)

    return () => document.body.removeEventListener("click", closeSearchList)

  }, []);



  const navLeft = document.querySelector('.nav-left')
  useEffect(() => {
    if(navLeft){
      console.log(navLeft)
      navLeft.style.overflow = 'hidden'
    }

  }, [navLeft]);

  const redirectHome = () => {
    setScrollToFriends(false)
    setClickedPosts(true)
    setClickedFriends(false)
    history.push('/')
  }
  const redirectProfile = () => {
    setProfileDropDown(false)
    history.push(`/users/${current_user.id}`)
  }

  const cancelSearchFunc = (e) => {
    e.stopPropagation()
    setSearchList(false)
  }
  return (
    <div className="nav-container">
      <ul className='nav-list'>
        <li className='search-nav'>
          <img onClick={redirectHome} id="logo" className={searchList ? 'hide-icon' : 'phasebook-icon'} src="https://i.imgur.com/XwPiQNW.png" alt=""/>
          <div onClick={() => setSearchList(true)}  ref={listRef} className={searchList === false ? 'nav-left' : 'nav-left-clicked'}>
            <div onClick={(e) => cancelSearchFunc(e)} className="cancel-search">
              {searchList && (
                <i class="fa-sharp fa-solid fa-arrow-left-long left-arrow-search"></i>

              )}
            </div>
            <div onClick={() => setSearchList(true)} className="search-bar">

              <img className='search-icon' src="https://img.icons8.com/fluency-systems-filled/15/000000/search.png" alt=""/>
              <input
                      onClick={() => setSearchList(true)}
                      className='search-input'
                      type="search"
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                      spellcheck="false"
                      placeholder='Search Facebook' />
            </div>
            {searchList && (

              <UsersList searchList={searchList} setSearchList={setSearchList} searchString={searchString} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-middle">
            <a href="https://www.linkedin.com/in/waseemalame/"><i class="fa-brands fa-linkedin linkedin-icon"></i></a>
            <a href="https://github.com/Waseemalame/Phasebook"><i class="fa-brands fa-github github-icon"></i></a>

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
              <LogoutButton />

            </div>
          ) : ''}
        </li>
      </ul>
    </div>
  )
}

export default Navigation
