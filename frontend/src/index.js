import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { MemberProvider } from './context/MemberContext';
import { DonorProvider } from './context/DonorContext';
import { DonationProvider } from './context/DonationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DonationProvider>
      <DonorProvider>
    <MemberProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </MemberProvider>
    </DonorProvider>
    </DonationProvider>
  </React.StrictMode>
);