import React from 'react'
import EditPostModal from '../EditPost'

const PostOptions = ({ post }) => {
  return (
    <div>
      <EditPostModal post={post} />

    </div>
  )
}

export default PostOptions
