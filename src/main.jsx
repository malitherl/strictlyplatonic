import { createRoot } from 'react-dom/client'
import { UserProvider } from "./utils/userContext.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css';
import { Home } from './components/Home.jsx';
import { MyProfile } from './components/MyProfile.jsx';
import { Events } from './components/Events.jsx';
import ErrorPage from "./ErrorPage.jsx";
import UserProfile from './components/UserProfile.jsx';
import LoginButton from './components/LoginButton';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App />
        <LoginButton />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />, 
      },
      {
        path: "/my_profile",
        element: <MyProfile />
      }, 
      {
        path: "/events",
        element: <Events />
      }, 
      {
        path: "/users",
        element: <UserProfile />
      }
    ],
  },
  
]);



createRoot(document.getElementById('root')).render(
  
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN_ID}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Auth0Provider>,
)
