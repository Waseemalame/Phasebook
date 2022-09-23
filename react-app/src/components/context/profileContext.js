import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext()
export const useProfileContext = () => useContext(ProfileContext)

export default function ProfileContextProvider(props){
  const [clickedFriends, setClickedFriends] = useState(false);
  const [clickedPosts, setClickedPosts] = useState(true);
  const [scrollToFriends, setScrollToFriends] = useState(false);
  return (
    <ProfileContext.Provider
    value={{
      clickedFriends,
      setClickedFriends,
      clickedPosts,
      setClickedPosts,
      scrollToFriends,
      setScrollToFriends
    }}
    >
      {props.children}
  </ProfileContext.Provider>
)
}
