import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { userContextProvider } from './context/userContext';
import { MembersContextProvider } from './context/MembersContext';
import { AuthProvider } from './context/AuthContext';
import { MemberProvider } from './context/MembersContext';
import { DonorProvider } from './context/DonorContext';
import { DonationProvider } from './context/DonationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <userContextProvider>
      <MembersContextProvider>
        <DonorProvider>
          <DonationProvider>
            <App />
          </DonationProvider>
        </DonorProvider>
      </MembersContextProvider>
     </userContextProvider>
    </AuthProvider>
  </React.StrictMode>
);