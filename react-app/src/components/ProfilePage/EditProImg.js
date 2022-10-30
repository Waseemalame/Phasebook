import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, updateUserThunk } from '../../store/session';
import { useProfileContext } from '../context/profileContext';

import "./ProfilePage.css"

const EditProImg = ({ user }) => {
  const [profileImg, setProfileImg] = useState('');
  const current_user = useSelector(state => state.session.user)

  const [image, setImage] = useState(null);
  const { profileImgPreview, setProfileImgPreview, setProImgUpdated, proImgUpdated } = useProfileContext();
  const [showPrev, setShowPrev] = useState(false);
  const [imgObj, setImgObj] = useState('');
  const dispatch = useDispatch()


  useEffect(() => {
    if(current_user.id !== user.id){
      setProfileImgPreview('')
    }
    return () => {
      setProfileImgPreview('')
    };
  }, []);
  const updateImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    setImage(file);

    setProfileImgPreview(URL.createObjectURL(file))
  }
  const cancelProfileImgEdit = () => {
    setProfileImgPreview('')
  }
  const acceptProfileImgEdit = async () => {
    if(image){
      const formData = new FormData();
      formData.append("image", image);
      formData.append("user_id", current_user.id)

      const res = await fetch(`/api/images/`, {
        method: "POST",
        body: formData,
      })
      if(res.ok){
        const new_image = await res.json();
        const userData = {
          id: current_user.id,
          profile_image_url: new_image.image_url
        }
        await dispatch(updateUserThunk(userData))

        setImage(null);
        setProImgUpdated(true)
        setProfileImgPreview()
      }

    }
    // setProfileImgPreview('')

  }
  if(profileImgPreview){
    return (
      <div className="edit-pro-img-container">
      <div onClick={acceptProfileImgEdit} className="accept-profile-img"><i class="fa-sharp fa-solid fa-check"></i></div>
      <div onClick={cancelProfileImgEdit} className="decline-profile-img">
      <i class="fa-sharp fa-solid fa-xmark"></i>
      </div>
      </div>
    )
  } else return (
      <div className='edit-pro-img-container'>
        <label className='profile-img-label' htmlFor="profile-img-input">
          <i class="fa-solid fa-camera"></i>
        </label>
        <input
                id='profile-img-input'
                type="file"
                accept="image/*"
                onChange={(e) => updateImage(e)}
                />

      </div>

  )
}

export default EditProImg
