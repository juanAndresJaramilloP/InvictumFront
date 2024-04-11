import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn btn-primary rounded-lg " style={{ color: 'white' }} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;