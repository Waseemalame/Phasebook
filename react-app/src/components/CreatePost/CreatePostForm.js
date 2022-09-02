import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post';
import UploadPicture from '../UploadPicture';

import "./CreatePostForm.css"

const CreatePostForm = () => {
  const user = useSelector(state => state.session.user);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [content, setContent] = useState('');
  const dispatch = useDispatch()
  useEffect(() => {
  }, []);
  const handleCreatePost = async (e) => {
    e.preventDefault()

  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", image);
  formData.append("content", content);
  formData.append("user_id", user.id)
  // aws uploads can be a bit slow—displaying
  // some sort of loading message is a good idea
  setImageLoading(true);

  const res = await fetch('/api/posts', {
    method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      const data = {
        content,
        user_id: user.id,
        image_url: image
      }
      console.log(image)
      console.log('imagehere')
      console.log('imagehere')
      console.log('imagehere')
      console.log('imagehere')
          await dispatch(createPost(data))
          setContent('')
      // history.push("/images");
    }
    else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
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
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input type="text"
               placeholder={`What's on your mind, ${user.first_name}`}
               value={content}
               onChange={(e) => setContent(e.target.value)}
         />
         {/* <UploadPicture /> */}
         <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit" onClick={handleSubmit}>Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        {/* <button type="submit">Post</button> */}
      </form>

    </div>
  )
}

export default CreatePostForm
