import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getPostsThunk } from '../../store/post';
import UploadPicture from "../UploadPicture/UploadPicture"
import "./CreatePostForm.css"

const CreatePostForm = ({ setShowModal, showModal, modalClosed }) => {
  const user = useSelector(state => state.session.user);
  const [errorValidations, setErrorValidations] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [addImg, setAddImg] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const data = {
      content,
      user_id: user.id,
      image_url: image
    }


    const new_post = await dispatch(createPost(data))

    const formData = new FormData();
    formData.append("image", image);
    formData.append("post_id", new_post.id)

    const res = await fetch('/api/images/', {
      method: "POST",
      body: formData,
  });
  if (res.ok) {
    const new_image = await res.json();
    new_post["image_url"] = new_image.image_url
    setImageLoading(false);
    // history.push("/images");
}
  else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
  }
      setContent('')

      setShowModal(false)
      dispatch(getPostsThunk())
  }

  useEffect(() => {
    let uploadImageLabel = document.querySelector('.upload-image-label')
    let textArea;
    textArea = document.querySelector(".create-post-textarea")
    const textareaHeight = () => {

      textArea.style.height = (textArea.scrollHeight) + "px";
      // console.log(textArea.style.height)
    }
    textareaHeight()

    if(content.length > 100){
      textArea.style.fontSize = '16px'
    } else {
      textArea.style.fontSize = '24px'
    }

    let textAreaUpload;
    textAreaUpload = document.querySelector('.textarea-with-upload')

    if(!addImg){
      return;
    } else {
      textAreaUpload.scrollBy({
        top: 250,
        behavior: 'smooth'
      })
    }

    if(content.length > 338 || addImg){
      textAreaUpload.style.overflowY = 'scroll'
    } else {

      textAreaUpload.style.overflowY = 'hidden'
    }

  }, [content, addImg]);

  useEffect(() => {
    let errors = [];
    if(content.length > 2000) {
      errors.push('Post content must not exceed 2000 characters')
      setErrorValidations([errors])
    } else {
      setErrorValidations([])
    }
  }, [content.length]);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}
const redirectProfile = (user) => {
  history.push(`/users/${user.id}`)
}
  return (
    <div className='create-post-container'>
      <div className="create-post-header">
        Create post
      </div>
      <div className="create-post-user-info">
        {user.profile_image_url ? (
          <img onClick={() => redirectProfile(user)} className="post-user-image" src={user.profile_image_url} alt="" />

          ) : (

            <img onClick={() => redirectProfile(user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
        )}
          <span className='user-first-last'>{user.first_name} {user.last_name}</span>
      </div>
      <form className="create-post-form" onSubmit={handleCreatePost}>
      <ul className='create-post-errors'>{errorValidations.map(error =><li>{error}</li>)}</ul>

        <div className="create-form-inner-container">
        <div className='textarea-with-upload'>

        <textarea
               className='create-post-textarea'
               type="text"
               placeholder={`What's on your mind, ${user.first_name}?`}
               value={content}
               onChange={(e) => setContent(e.target.value)}
               required
               />
               {addImg && (
        <div className='file-input-container' id='f-i-c'>
              <label className='upload-image-label' htmlFor="upload-image-input">
               <div className='add-photo-icon'><img src="https://img.icons8.com/sf-ultralight-filled/24/000000/add-image.png" alt="add"/></div>
               <div>Add a Photo</div>
               <div><p className='drag-drop-text'>or drag and drop</p></div>
              </label>
              <input
                     id='upload-image-input'
                     type="file"
                     accept="image/*"
                     placeholder='dsfd'
                     onChange={updateImage}
                     autoFocus
                     />
                 {(imageLoading)&& <p>Loading...</p>}
        </div>
               )}
               </div>



      </div>
        <div className="add-post-with-btn">
           <div className="add-to-post">
            <div>Add to your post</div>
            <div onClick={() => setAddImg(true)} className="img-upload-icon"></div>
           </div>
           <button disabled={errorValidations.length > 0} className='create-post-btn' type="submit">Post</button>
        </div>


      </form>
    </div>
  )
}

export default CreatePostForm
