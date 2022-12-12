import { createContext, useReducer } from 'react';

export const MembersContext = createContext();

export const membersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEMBERS':
      return {
        members: action.payload,
      }
    case 'CREATE_MEMBER': 
      return {
        members: [action.payload, ...state.members],
      }
    case 'DELETE_MEMBER':
      return {
        members: state.members.filter(w => w._id !== action.payload._id) 
      }
    default: 
      return state;
  }
}

export const MembersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(membersReducer, {
    members: null,
  })

  return (
    <MembersContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MembersContext.Provider>
  )
}
