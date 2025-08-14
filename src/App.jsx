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
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Wiki from './Wiki';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';
import Header from './Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="/secured" element={<SecuredContent />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </Router>
    
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

      <button
        type="button"
        className="text-blue-800"
        onClick={() => keycloak.logout()}
      >
        Logout ({keycloak?.tokenParsed?.preferred_username})
      </button>
    </div>
  );
};

export const isLoggedIn = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  if (isLoggedIn === false) keycloak?.login();
  if (!isLoggedIn) return <div>Not logged in</div>;
}

export default App
