import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { MemberProvider } from './context/MemberContext';
import { DonorProvider } from './context/DonorContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DonorProvider>
    <MemberProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </MemberProvider>
    </DonorProvider>
  </React.StrictMode>
);