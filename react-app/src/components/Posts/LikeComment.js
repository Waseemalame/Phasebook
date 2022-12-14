import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeThunk, deleteLikeThunk } from '../../store/like'
// import { addLikeThunk, deleteLikeThunk } from '../../../store/like'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
const LikeComment = ({ post }) => {
  const current_user = useSelector(state => state.session.user)
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchLike(){
      const res = await fetch(`/api/likes/one/${post.id}/${current_user.id}`)
      if(res.ok){
        const like = await res.json()
        if(like.post_id === post.id && like.user_id === current_user.id){
          setLiked(true)
          setLikeId(like.id)
        }
      }
    }
    fetchLike()

  }, []);


  const createLike = async () => {
    if(!liked){

      const data = {
        post_id: post.id,
        user_id: current_user.id
      }
      const like = await dispatch(addLikeThunk(data))
      if(like){
        setLiked(true)
        setLikeId(like.id)
      }

    }
  }
  const deleteLike = async () => {
    if(liked && likeId){

      await dispatch(deleteLikeThunk(likeId))
      setLiked(false)
      setLikeId(null)
    }

  }
  const cmtInput = document.getElementById(`${post.id}-comment-input`)
  return (
    <div className='like-comment-section'>
      <div onClick={liked ? deleteLike : createLike} className="click-like">

        <div className={liked ? 'like-icon' : 'liked-icon'}>{liked ? (
          <div className="liked-icon-container">
            <ThumbUpAltRoundedIcon sx={{ stroke: "white", strokeWidth: 1 }} fontSize="small"/>
          </div>
          ) : (
            <div className="unliked-icon-container">
              <ThumbUpOffAltIcon sx={{ stroke: "#ffffff", strokeWidth: .7 }} fontSize='small' />
              {/* Alternate Like Icon-img */}
              {/* <img className={liked ? 'like-icon' : 'liked'}
                src={"https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/18/000000/external-like-feedback-kmg-design-detailed-outline-kmg-design.png"
                  } alt=""/> */}
            </div>

        )}</div>
        <span className={liked ? 'liked' : 'like-icon-text'}>Like</span>

        </div>
      <div className="click-comment" onClick={() => cmtInput.focus()}>
        <img className='comment-icon' src="https://img.icons8.com/ios/18/000000/comments.png" alt=""/>
        <span className="comment-icon-text">Comment</span>

        </div>
    </div>
  )
}

export default LikeComment
