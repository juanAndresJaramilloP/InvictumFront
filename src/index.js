import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { IntlProvider } from 'react-intl';
import { Auth0Provider } from '@auth0/auth0-react';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

const userLanguage = navigator.language || navigator.userLanguage;
const messages = userLanguage.startsWith("es") ? localeEsMessages : localeEnMessages;

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

serviceWorkerRegistration.register();

//root.render(<Acordeon informacion ={ objetos } ></Acordeon>);
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <IntlProvider locale={userLanguage} messages={messages}>
      <App />
    </IntlProvider>
  </Auth0Provider>
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
