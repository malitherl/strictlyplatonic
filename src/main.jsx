import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  //***DO NOT DELETE THIS***
  // <Auth0Provider
  //   domain={process.env.AUTH_DOMAIN_ID}
  //   clientId={process.env.AUTH_CLIENT_ID}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  //>

  <StrictMode>
    
    <App />
  </StrictMode>

  //***DO NOT DELETE THIS***
  //</Auth0Provider>,
)
