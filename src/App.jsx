import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Preview from "./Preview";
import WorkInProgress from "./WorkInProgress";
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/wip" element={<WorkInProgress />} />
      </Routes>
    </Router>
  );
}

export default App
