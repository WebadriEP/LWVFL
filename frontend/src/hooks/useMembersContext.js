import { MembersContext } from "../context/MembersContext"
import { useContext } from "react"

export const useMembersContext = () => {
  const context = useContext(MembersContext)

  if(!context) {
    throw Error('useMembersContext must be used inside a MembersContextProvider')
  }

  return context
}
