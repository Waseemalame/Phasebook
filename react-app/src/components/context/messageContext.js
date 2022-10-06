import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessageContext = () => useContext(MessageContext)

export default function MessageContextProvider(props){
  const [showMsgPopup, setShowMsgPopup] = useState(false);
  const [msgUser, setMsgUser] = useState(null);
  const [messages, setMessages] = useState([])
  const [lastMessage, setLastMessage] = useState('');
  const [latestMessage, setLatestMessage] = useState('');
  const [messageSent, setmessageSent] = useState(false);
  const [mostRecentMessager, setMostRecentMessanger] = useState(0);

  return (
    <MessageContext.Provider
    value={{
      showMsgPopup,
      setShowMsgPopup,
      msgUser,
      setMsgUser,
      messages,
      setMessages,
      latestMessage,
      setLatestMessage,
      messageSent,
      setmessageSent,
      lastMessage,
      setLastMessage,
      mostRecentMessager,
      setMostRecentMessanger
    }}
    >
      {props.children}
  </MessageContext.Provider>
)
}
