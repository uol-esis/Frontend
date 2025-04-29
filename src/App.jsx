import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Preview from "./Preview";
import WorkInProgress from "./WorkInProgress";
import './css/App.css'
import QueryBuilder from "./CreateQuery.js";
import QueryBuilder2 from "./CreateQuery2.js";
import {QueryBuilder3} from "./queryBuilderNew/QueryBuilder.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/wip" element={<WorkInProgress />} />
          <Route path="/test" element={<QueryBuilder />} />
        <Route path="/test2" element={<QueryBuilder2 />} />
        <Route path="/test3" element={<QueryBuilder3 />} />
      </Routes>
    </Router>
  );
}

export default App
