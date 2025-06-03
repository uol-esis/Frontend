import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Preview from "./Preview";
import WorkInProgress from "./WorkInProgress";
import Feedback from './Feedback';
import Edit from "./Edit";
import { useEffect } from "react";
import './css/App.css'
import Apis from "./Apis"
import keycloak from "./keycloak"
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Wiki from './Wiki';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="/secured" element={<SecuredContent />} />
          <Route path="/edit" element={<Edit />} />
          <Route path= "/feedback" element={<Feedback/>} />
          <Route path= "/wiki" element={<Wiki/>} />
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
      <h2>Secured frontend content</h2>
      <Apis />
    </div>
  );
};

export default App
