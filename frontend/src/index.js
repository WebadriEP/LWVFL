import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserContextProvider } from './context/userContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </AuthProvider>
  </React.StrictMode>
);