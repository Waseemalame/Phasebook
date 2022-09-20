import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessageContext = () => useContext(MessageContext)

export default function MessageContextProvider(props){
  const [showMsgPopup, setShowMsgPopup] = useState(false);
  const [msgUser, setMsgUser] = useState(null);

  return (
    <MessageContext.Provider
    value={{
      showMsgPopup,
      setShowMsgPopup,
      msgUser,
      setMsgUser
    }}
    >
      {props.children}
  </MessageContext.Provider>
)
}
