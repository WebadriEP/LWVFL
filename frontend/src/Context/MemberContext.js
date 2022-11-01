import { createContext, useReducer } from 'react';

export const memberContext = createContext();

export const membersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEMBERS':
      return {
        members: action.payload,
      };
    case 'CREATE_MEMBERS': 
      return {
        volunteers: [action.payload, ...state.members],
      };
    case 'DELETE_MEMBERS':
      return {
        volunteers: state.members.filter((v) => v._id !== action.payload._id),
      };
    default: 
      return state;
  }
}

export const MemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(membersReducer, {
    members: null,
  });

  return (
    <memberContext.Provider value={{ ...state, dispatch }}>
      {children}
    </memberContext.Provider>
  );
}