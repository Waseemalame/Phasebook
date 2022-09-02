import React from 'react'
import { useEffect } from 'react'

const CommentOptions = ({setShowModal, editClicked, setEditClicked, user}) => {
  useEffect(() => {
    console.log(editClicked)
  }, [editClicked]);
  const handleEditClick = () => {
    // console.log(editClicked)
    // console.log('wtfwtfwtwfw???')
  }
  return (
    <div onClick={() => setEditClicked(true)}>Edit</div>
  )
}

export default CommentOptions
