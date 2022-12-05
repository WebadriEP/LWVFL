import { createContext, useReducer } from 'react';

export const donationContext = createContext();

export const donationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DONATIONS':
      return {
        donations: action.payload,
      };
    case 'CREATE_DONATIONS': 
      return {
        donations: [action.payload, ...state.donations],
      };
    case 'DELETE_DONATIONS':
      return {
        donations: state.donations.filter((v) => v._id !== action.payload._id),
      };
    default: 
      return state;
  }
}

export const DonationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(donationsReducer, {
    donors: null,
  });

  return (
    <donationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </donationContext.Provider>
  );
}