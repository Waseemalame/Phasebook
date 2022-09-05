
export const ADD_COMMENT = "comments/ADD_COMMENT";
export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
export const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const add = (comment) => ({
  type: ADD_COMMENT,
  comment
});
const load = (comments) => ({
  type: LOAD_COMMENTS,
  comments

});
const update = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});
const remove = (commentId, postId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId
});


export const getComments = () => async (dispatch) => {

  const response = await fetch(`/api/comments/`);

  if (response.ok) {

    const comments = await response.json();
    dispatch(load(comments));
  }

};

export const createComment = (data) => async (dispatch) => {
  const {
    comment_content,
    user_id,
    post_id
  } = data

  const formData = new FormData()

  formData.append('comment_content', comment_content)
  formData.append('user_id', user_id)
  formData.append('post_id', post_id)


  const response = await fetch(`/api/posts/${data.post_id}/comments`, {
    method: 'POST',
    body: formData
  });
    const newComment = await response.json()


    dispatch(add(newComment))
    return newComment

}
export const updateComment = (data, commentId) => async dispatch => {

  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  const comment = await response.json()
  dispatch(update(comment))
  return comment

}

export const deleteComment = (commentId, postId) => async dispatch => {
  const response = await fetch(`/api/comments/${commentId}/`, {
    method: 'delete',
  });

  if (response.ok) {

    dispatch(remove(commentId, postId));

  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_COMMENTS:
      const newComments = {};
      action.comments.comments.forEach(comment => {
        newComments[comment.id] = comment;
      })
      return {
        ...state,
        ...newComments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case REMOVE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
export default commentsReducer
