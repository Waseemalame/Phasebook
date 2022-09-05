import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, getPostsThunk } from '../../store/post';
import UploadPicture from "../UploadPicture/UploadPicture"
import "./CreatePostForm.css"

const CreatePostForm = ({ setShowModal }) => {
  const user = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    console.dir(document.querySelector(".upload-image-input"))
  }, []);
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

    const res = await fetch('/api/images', {
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
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}
  return (
    <div className='create-post-container'>
      <div className="create-post-header">
        Create post
      </div>
      <div className="create-post-user-info">
          <img className="post-user-image" src={user.profile_image_url} alt="" />
          <span className='user-first-last'>{user.first_name} {user.last_name}</span>
      </div>
      <form className="create-post-form" onSubmit={handleCreatePost}>
        <input
               className='create-post-input'
               type="text"
               placeholder={`What's on your mind, ${user.first_name}`}
               value={content}
               onChange={(e) => setContent(e.target.value)}
         />
        <div className='file-input-container' id='f-i-c'>
         <div className='file-input-text'></div>
         <input

                className='upload-image-input'
                // style={{"visibility": "hidden"}}
                type="file"
                accept="image/*"
                placeholder='dsfd'
                onChange={updateImage}
                />
            {(imageLoading)&& <p>Loading...</p>}
            </div>

        <button className='create-post-btn' type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm
