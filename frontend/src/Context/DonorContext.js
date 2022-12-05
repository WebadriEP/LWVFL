import { createContext, useReducer } from 'react';

export const donorContext = createContext();

export const donorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DONORS':
      return {
        donors: action.payload,
      };
    case 'CREATE_DONORS': 
      return {
        donors: [action.payload, ...state.donors],
      };
    case 'DELETE_DONORS':
      return {
        donors: state.donors.filter((v) => v._id !== action.payload._id),
      };
    default: 
      return state;
  }
}

export const DonorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(donorsReducer, {
    donors: null,
  });

  return (
    <donorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </donorContext.Provider>
  );
}