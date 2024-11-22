import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";


const LoginButton = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("redirecting to home");
      
    }
  }, [isAuthenticated]);

  return !isAuthenticated ? <div className="loginPanel"><button id="login" onClick={() => loginWithPopup()}>Log In</button><a id="auth0logo" href="https://auth0.com/" target="_blank" ><img src="https://images.ctfassets.net/23aumh6u8s0i/5DmYnzyKV26HjuOgJIvs4d/79ff12196b68401e2f4b7f998bd46ad8/auth0_by_okta_hero_copy.png" alt="auth0 x okta logo" /></a></div> :  <Navigate to="/home" replace={true} />;
};

export default LoginButton;
