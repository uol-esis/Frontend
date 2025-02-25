import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import './App.css'
import SchemeSelection from './SchemeSelection';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} /> 
        <Route path="/schemeSelection" element={<SchemeSelection/>} />
      </Routes>
    </Router>
  );
}

export default App
