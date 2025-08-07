import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import { div, p } from "framer-motion/client";

export default function GenerateSchemaComponent({onGenerate , fileIsValid, isLoading}){
    const [validFile, setValidFile] = useState(fileIsValid);

    useEffect(() => {
      setValidFile(fileIsValid);
    }, [fileIsValid])

    return(
        <div className="p-2 bg-white shadow rounded-[10px]">
            <h2 className="text-xl font-bold mb-2">Automatisch neue Tabellentransformation erstellen</h2>
            <button
              type="button"
              onClick={() => {onGenerate();}}
              className={`w-full rounded-md py-2 text-sm font-semibold text-white ${
                validFile ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
              }`}
              
              disabled={!validFile}
            >
              {isLoading ? 
                <div className="flex justify-center">
                  <Spinner size={6}/>
                </div>
              : 
                <p>Generierung</p> 
              }
              
            </button>
          </div>
    );
}