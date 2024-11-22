import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated ? <button onClick={() => logout()}>Log Out</button> : <Navigate to="/" replace={true} />
  );
};

export default LogoutButton;