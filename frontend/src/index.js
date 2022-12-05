import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';import { UserContextProvider } from './Context/userContext';
import { MembersContextProvider } from './Context/MembersContext'
import { AuthProvider } from './context/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { DonorProvider } from './context/DonorContext';
import { DonationProvider } from './context/DonationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <MembersContextProvider>
        <DonorProvider>
          <DonationProvider>
            <App />
          </DonationProvider>
        </DonorProvider>
      </MembersContextProvider>
    </AuthProvider>
  </React.StrictMode>
);