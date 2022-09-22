const LOAD_MESSAGES = "messages/load-messages"
const CREATE_MESSAGE = "messages/create-messages"

const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages
})

const createMessage = (message) => ({
  type: CREATE_MESSAGE,
  message
})

export const loadMessagesThunk = (recipient_id) => async (dispatch) => {

  const res = await fetch(`/api/messages/${recipient_id}`)
  console.log(res)
  if(res.ok){
    const messages = await res.json()
    dispatch(loadMessages(messages.all_messages))
    return messages.all_messages
  }
}

export const createMessageThunk = (data) => async (dispatch) => {
  const {
    msg_body,
    msg_sender_id,
    msg_recipient_id
  } = data

  const formData = new FormData()
  formData.append('msg_body', msg_body)
  formData.append('msg_sender_id', msg_sender_id)
  formData.append('msg_recipient_id', msg_recipient_id)

  const res = await fetch('/api/messages/', {
    method: 'POST',
    body: formData
  })
  if(res.ok){
    const message = await res.json()
    dispatch(createMessage(message))
    return message
  }
}





const initialState = {};
const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_MESSAGES:
        const newState = {}
        action.messages.forEach(message => {
          newState[message.id] = message
        })
        return newState
      case CREATE_MESSAGE:
        return {
          ...state,
          [action.message.id]: action.message
        }
        default:
            return state;
    }
}

export default messagesReducer
