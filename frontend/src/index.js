import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserContextProvider } from './Context/userContext';
import { MembersContextProvider } from './Context/MembersContext'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MembersContextProvider>
      <App />
    </MembersContextProvider>
  </React.StrictMode>
);