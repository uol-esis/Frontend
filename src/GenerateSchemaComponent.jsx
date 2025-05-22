import { useState, useEffect } from "react";

export default function GenerateSchemaComponent({onGenerate , fileIsValid}){
    const [validFile, setValidFile] = useState(fileIsValid);

    useEffect(() => {
      console.log("validfile " + fileIsValid);
      setValidFile(fileIsValid);
    }, [fileIsValid])

    return(
        <div className="p-2 bg-gray-100 rounded-[10px]">
            <h2 className="text-xl font-bold mb-2">Neue Tabellentransformation erstellen</h2>
            <button
              type="button"
              onClick={onGenerate}
              className={`w-full rounded-md py-2 text-sm font-semibold text-white ${
                validFile ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
              }`}
              
              disabled={!validFile}
            >
              Generierung
            </button>
          </div>
    );
}