import React from 'react'
import DeletePostModal from '../DeletePost'
import EditPostModal from '../EditPost'

const PostOptions = ({ post }) => {
  return (
    <div>
      <EditPostModal post={post} />
      <DeletePostModal post={post} />
    </div>
  )
}

export default PostOptions
