import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FormattedMessage } from 'react-intl';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (<button className="btn btn-primary rounded-lg " style={{ color: 'white' }} onClick={() => loginWithRedirect()}><FormattedMessage id='Empezar Ahora' /></button>)
  );
};

export default LoginButton;