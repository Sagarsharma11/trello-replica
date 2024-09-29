import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from './utils/credentials';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={"84666901513-h4t1napphh6cedfejneaf9a8t53jk4u3.apps.googleusercontent.com"}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
