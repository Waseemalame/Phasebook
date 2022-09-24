import { createContext, useContext, useState } from "react";

export const MultiContext = createContext()
export const useMultiContext = () => useContext(MultiContext)

export default function MultiContextProvider(props){
  const [commentBtnClicked, setCommentBtnClicked] = useState(false);

  return (
    <MultiContext.Provider
    value={{
      commentBtnClicked, setCommentBtnClicked,
    }}
    >
      {props.children}
  </MultiContext.Provider>
)
}
