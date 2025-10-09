import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header'
import BrowserWarning from './components/BrowserWarning'
import Footer from './Footer'
import keycloak from "./keycloak"
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

const initOptions = {
  onLoad: "check-sso", // perform silent SSO check, won't force visible redirect
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  pkceMethod: "S256",
  checkLoginIframe: false, // optional: disable iframe polling if you prefer
};

createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloak}
    initOptions={initOptions}
    LoadingComponent={<div>Loading...</div>}

  >
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <BrowserWarning />
        <App />
      </main>
      <Footer />
    </div>
  </ReactKeycloakProvider>
)
