import React from 'react'
import DeletePostModal from '../DeletePost'
import EditPostModal from '../EditPost'

const PostOptions = ({ post, setShowPostOptionsModal }) => {
  return (
    <div className='post-options-menu'>
      <EditPostModal setShowPostOptionsModal={setShowPostOptionsModal} post={post} />
      <DeletePostModal setShowPostOptionsModal={setShowPostOptionsModal} post={post} />
    </div>
  )
}

export default PostOptions
