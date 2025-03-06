import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UploadNew from "./UploadNew";
import './App.css'
import Preview from './Preview';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/uploadNew" element={<UploadNew />} />
      </Routes>
    </Router>
  );
}

export default App
