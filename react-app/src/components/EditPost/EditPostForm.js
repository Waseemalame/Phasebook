import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostThunk } from '../../store/post';
const EditPostForm = ({ post }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(post.content);
  const user = useSelector(state => state.session.user);

  const handleEditPost = (e) => {
    e.preventDefault()
    const data = {
      content,
      user_id: user.id
    }

    dispatch(updatePostThunk(data, post.id))

  }
  return (
    <div className='create-post-container'>
    <div className="create-post-header">
      Edit post
    </div>
    <div className="create-post-user-info">
        <img className="post-user-image" src={post.user.profile_image_url} alt="" />
        <span className='user-first-last'>{post.user.first_name} {post.user.last_name}</span>
    </div>
    <form className="create-post-form" onSubmit={handleEditPost}>
      <input type="text"
             placeholder={`What's on your mind, ${post.user.first_name}`}
             value={content}
             onChange={(e) => setContent(e.target.value)}
       />
      <button type="submit">Save</button>
    </form>
  </div>
  )
}

export default EditPostForm
