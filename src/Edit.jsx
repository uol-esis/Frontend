import { useNavigate } from "react-router-dom";
import React, {useState} from "react"; //Wieso "React"?
import ConverterCard from "./components/ConverterCard";



function Edit() {
  const navigate = useNavigate();

  const [activeParams, setActiveParams] = useState(null);

  return (
    <div className="flex">
      <button className="bg-blue-500 text-white"
      onClick={() => setActiveParams(["X", "Y"])}>
        Converter1
      </button>
      <button className="bg-blue-500 text-white"
      onClick={() => setActiveParams(["X", "Y", "Z"])}>
        Converter2
      </button>

      {activeParams && <ConverterCard parameters={activeParams} />}

    </div>
  
  );
}

export default Edit;