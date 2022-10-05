import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteImagesThunk, getImagesThunk } from '../../store/image';
import { getPostsThunk, updatePostThunk } from '../../store/post';

const EditPostForm = ({ post, setShowEditPostModal, setShowPostOptionsModal}) => {
  const postId = post.id
  const user = useSelector(state => state.session.user);
  const postImage = useSelector(state => Object.values(state.images).filter(image => image.post_id === post.id)[0])
  const dispatch = useDispatch()
  const history = useHistory()

  const [content, setContent] = useState(post.content);
  const [errorValidations, setErrorValidations] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState(postImage ? postImage.image_url : null);
  const [newImage, setNewImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [addImg, setAddImg] = useState(image ? true : false);


  const [imageUrl, setImageUrl] = useState('');

  const handleEditPost = async (e) => {

    e.preventDefault()
    const data = {
      content,
      user_id: user.id,
      image_url: image || newImage
    }
    if((newImage || !image) && post.images[0]){

      dispatch(deleteImagesThunk(postImage.id))
    }

    dispatch(updatePostThunk(data, post.id))

    const formData = new FormData();
    if(image && !newImage){
      formData.append("image", image);
    } else if(newImage && !image){
      formData.append("image", newImage);
    }
    formData.append("post_id", post.id)
    if(!image && !newImage){
      setContent('')
      dispatch(getImagesThunk())
      dispatch(getPostsThunk())

      setShowEditPostModal(false)
      setShowPostOptionsModal(false)
    } else {
      if(newImage){

        const res = await fetch('/api/images', {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const new_image = await res.json();
          post["image_url"] = new_image.image_url
          setImageLoading(false);
      }
      else {
        setImageLoading(false);
        // a real app would probably use more advanced
        // error handling
        console.log("error");
      }
    }
    }
      setContent('')
      dispatch(getImagesThunk())
      dispatch(getPostsThunk())

            setShowEditPostModal(false)
            setShowPostOptionsModal(false)

  }

    // STYLING
    useEffect(() => {
      let uploadImageLabel = document.querySelector('.upload-image-label')
      let textArea;
      textArea = document.querySelector(".create-post-textarea")

      const textareaHeight = () => {
        textArea.style.height = (textArea.scrollHeight) + "px";
      }
      textareaHeight()

      if(content.length > 100){
        textArea.style.fontSize = '16px'
      } else {
        textArea.style.fontSize = '24px'
      }

      let textAreaUpload = document.querySelector('.textarea-with-upload')

      if(content.length > 338 || addImg){
        textAreaUpload.style.overflowY = 'scroll'
      } else {

        textAreaUpload.style.overflowY = 'hidden'
      }

      let createPostContainer = document.querySelector('.create-post-container')
        if(errorValidations.length > 0) createPostContainer.style.marginBottom = '20px'
        else createPostContainer.style.marginBottom = '0px'

    }, [content, addImg, errorValidations]);

    // ERROR VALIDATIONS
    useEffect(() => {
      let errors = [];
      if(content.trim().length === 0) {
        errors.push('Post content must not be empty *')
        setErrorValidations([errors])
      }  else if(content.length > 2000) {
        errors.push('Post content must not exceed 2000 characters *')
        setErrorValidations([errors])
      } else if(content.length === 0) {
        errors.push('Post content must not be empty *')
        setErrorValidations([errors])

      } else {
        setErrorValidations([])
      }
    }, [content.length]);

    // IMAGE PREVIEW
    useEffect(() => {
      if(newImage){
        const preview = document.querySelector('.preview-image');
        const file = newImage;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          // convert image file to base64 string
          preview.src = reader.result;
          setImageUrl(preview.src)
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }

      }
    }, [newImage]);

    useEffect(() => {
      if(clicked){
        let textAreaUpload = document.querySelector('.textarea-with-upload')

        textAreaUpload.scrollBy({
          top: 10000,
          behavior: 'smooth'
        })
      }
      setClicked(false)
    }, [clicked]);

    const updateImage = (e) => {
      const file = e.target.files[0];
      setNewImage(file);
      }

    const removeImage = () => {
      setImage(null)
      setNewImage(null)
    }




  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }
  const handleClick = () => {
    setImage(null)
    setAddImg(false)
  }
  return (
    <div className='create-post-container'>
    <div className="create-post-header">
      Edit post
      <div onClick={() => setShowEditPostModal(false)} className="cancel-post">X</div>

    </div>
    <div className="create-post-user-info">
      {user.profile_image_url ? (
        <img onClick={() => redirectProfile(user)} className="post-user-image" src={user.profile_image_url} alt="" />

        ) : (

          <img onClick={() => redirectProfile(user)} className="post-user-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
      )}
        <span className='user-first-last'>{user.first_name} {user.last_name}</span>
    </div>
    <form className="create-post-form" onSubmit={handleEditPost}>

    <ul className='create-post-errors'>{errorValidations.map((error, index) =><li key={index}>{error}</li>)}</ul>

      <div className="create-form-inner-container">

      <div className='textarea-with-upload'>

      <textarea
             className='create-post-textarea'
             type="text"
             placeholder={`What's on your mind, ${user.first_name}?`}
             value={content}
             onChange={(e) => setContent(e.target.value)}
             autoFocus
             required
             />
             {addImg && (
               <div className='file-input-container' id='f-i-c'>

                  {image || newImage ? (
                      <div>
                          <img className='preview-image' src={!newImage ? image : ''} alt=""/>
                          <div onClick={() => removeImage()} className="remove-image">X</div>
                        </div>
        ) : (

              <label className='upload-image-label' htmlFor="upload-image-input">
                 <div className='add-photo-icon'><img src="https://img.icons8.com/sf-ultralight-filled/24/000000/add-image.png" alt="add"/></div>
                 <div>Add a Photo</div>
                 <div><p className='drag-drop-text'>or drag and drop</p></div>
              </label>
            )}
            <input
                id='upload-image-input'
                type="file"
                accept="image/*"
                onChange={(e) => updateImage(e)}
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

            <div
                className="img-upload-icon"
                onClick={() => {
                          setClicked(true)
                          setAddImg(true)
                          }}
              >

            </div>
         </div>
         <button disabled={errorValidations.length > 0} className='create-post-btn' type="submit">Post</button>
      </div>


    </form>
  </div>
  )
}

export default EditPostForm
