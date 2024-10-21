import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-k13dmk7kz2znw6vs.us.auth0.com"
    clientId="BXXa5eOuHfkAeeTF5dIxmM8FPjqExbSl"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,


)
