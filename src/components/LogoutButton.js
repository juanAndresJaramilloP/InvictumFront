import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FormattedMessage } from 'react-intl';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (<button className="btn btn-primary rounded-lg " style={{ color: 'white' }} onClick={() => logout()}><FormattedMessage id='Cerrar Sesión'/></button>)
  );
};

export default LogoutButton;