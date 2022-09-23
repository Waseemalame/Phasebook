import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessageContext = () => useContext(MessageContext)

export default function MessageContextProvider(props){
  const [showMsgPopup, setShowMsgPopup] = useState(false);
  const [msgUser, setMsgUser] = useState(null);
  const [messages, setMessages] = useState([])

  return (
    <MessageContext.Provider
    value={{
      showMsgPopup,
      setShowMsgPopup,
      msgUser,
      setMsgUser,
      messages,
      setMessages
    }}
    >
      {props.children}
  </MessageContext.Provider>
)
}
