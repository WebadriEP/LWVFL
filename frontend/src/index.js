import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './Context/userContext';
import { MemberProvider } from './Context/MemberContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MemberProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </MemberProvider>
  </React.StrictMode>
);