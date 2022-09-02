import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post';
import UploadPicture from '../UploadPicture';

import "./CreatePostForm.css"

const CreatePostForm = () => {
  const user = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const dispatch = useDispatch()
  useEffect(() => {
  }, []);
  const handleCreatePost = async (e) => {
    e.preventDefault()
    const data = {
      content,
      user_id: user.id
    }

    await dispatch(createPost(data))
    setContent('')
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
        <input type="text"
               placeholder={`What's on your mind, ${user.first_name}`}
               value={content}
               onChange={(e) => setContent(e.target.value)}
         />
         <UploadPicture />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm
