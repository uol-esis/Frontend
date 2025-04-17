import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Preview from "./Preview";
import WorkInProgress from "./WorkInProgress";
import './css/App.css'
import keycloak from "./keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <ReactKeycloakProvider authClient={keycloak}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/wip" element={<WorkInProgress />} />
        <Route path="/secured" element={<SecuredContent />} />
      </Routes>
    </Router>
    </ReactKeycloakProvider>
  );
}

const SecuredContent = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  useEffect(() => {
    if (isLoggedIn === false) keycloak?.login();
  }, [isLoggedIn, keycloak]);
  if (!isLoggedIn) return <div>Not logged in</div>;
  return (
    <div>
      <h2>Springboot app using Keycloak authentication provider</h2>
    </div>
  );
};

export default App
