import { createRoot } from 'react-dom/client'
import { UserProvider } from "./utils/userContext.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  //***DO NOT DELETE THIS***
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN_ID}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>,
)
