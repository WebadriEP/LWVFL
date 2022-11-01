import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { MemberProvider } from './context/MemberContext';
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