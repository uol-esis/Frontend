import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header'
import Footer from './Footer'
import keycloak from "./keycloak"
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <App />
      </main>
      <Footer />
    </div>
  </ReactKeycloakProvider>
)
