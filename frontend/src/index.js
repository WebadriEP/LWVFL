import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { AuthProvider } from './context/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { DonorProvider } from './context/DonorContext';
import { DonationProvider } from './context/DonationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <DonorProvider>
          <DonationProvider>
            <App />
          </DonationProvider>
        </DonorProvider>
      </UserContextProvider>
    </AuthProvider>
  </React.StrictMode>
);