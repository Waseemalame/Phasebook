import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import UsersList from '../UsersList';

import './Navigation.css'
const Navigation = ({ searchList, setSearchList}) => {
  const [searchString, setSearchString] = useState('');


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

  const renderSearchList = () => {
    setSearchList(true)
  }

  return (
    <div className="nav-container">
      <ul className='nav-list'>
        <li className='search-nav'>
          <div onClick={() => setSearchList(true)}  ref={listRef} className={searchList === false ? 'nav-left' : 'nav-left-clicked'}>
            <img className={searchList ? 'hide-icon' : ''} src="https://img.icons8.com/color/50/000000/facebook-new.png" alt=""/>
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
        </li>
        <li>
          <div className="nav-middle">
            <img src="https://img.icons8.com/material-outlined/20/000000/home--v4.png" alt=""/>
            <img src="https://img.icons8.com/ios-glyphs/20/000000/github.png" alt=""/>
          </div>
        </li>
        <li>
          <div className="nav-right">
            <img src="https://img.icons8.com/small/20/000000/user-male-circle.png" alt=""/>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
