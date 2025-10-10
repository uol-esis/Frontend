import { useState, useEffect } from 'react';
import { getApiInstance } from "./hooks/ApiInstance";

export default function SchemaList({list, setSchema, setSchemaName, file, handleConfirm, handlePlus, deleteDialogRef, setId}){

  const [schemaList, setSchemaList] = useState([
      { name: "Schema 1", description: "Description for Schema 1" },
      { name: "Schema 2", description: "Description for Schema 2" },
      { name: "Schema 3", description: "Description for Schema 3" }
    ]); // Default for the list of schemata
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSchema, setSelectedSchema] = useState(null);

    const filteredSchemaList = schemaList
    .filter(schema => schema.name.toLowerCase().includes(searchQuery.toLowerCase())); // Filter based on the search query

    useEffect (() => {
      setSchemaList(list);
    }, [list]);

    useEffect (() => {
      setSelectedFile(file);
    }, [file]);

    const getSelectedTableStructure= async function (id) {
      const {api} = await getApiInstance();
      api.getTableStructure(id, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          setSchema(JSON.parse(JSON.stringify(data))  );
        }
      });
  }

    return(
        <div className="flex-1 p-4 bg-white shadow rounded-[10px] flex flex-col h-full overflow-auto">
            <h2 className="text-xl font-bold mb-2">Bestehende Tabellentransformation verwenden</h2>
            <div className="flex flex-row justify-between mb-2">
              
              {/* Search */}
              <label className="flex w-full items-center gap-2 border border-gray-200 bg-white px-2 rounded-md">
                <input
                  type="text"
                  className="grow p-1"
                  placeholder="Suche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Plus button */}
              </label>
              <button type="button" onClick={handlePlus} className="ml-2 inline-flex items-center p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900 shadow-sm hover:bg-gray-400">
                <span className="text-lg font-bold">+</span>
              </button>
            </div>
            {/* list existing scheme */}
            <div className="p-1 w-full border-3 border-gray-100 rounded-[10px] overflow-auto flex-1">
              <ul>
                {filteredSchemaList.map((schema, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center cursor-pointer p-1 rounded whitespace-nowrap text-sm text-gray-700 hover:bg-gray-200 ${selectedSchema === schema ? 'bg-gray-300' : ''}`}
                    onClick={() => {setSelectedSchema(schema); getSelectedTableStructure(schema.id); setSchemaName(schema.name);}}
                  >
                    {/* schema */}
                    {schema.name}
                    <div className="flex gap-2">
                    
                      <button type ="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setId(schema.id); 
                          deleteDialogRef.current?.showModal();
                        }}
                        className="p-1 rounded hover:bg-gray-200 transform transition-transform duration-150 hover:scale-110">
                          🗑️
                        </button>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
            {/* Weiter Button */}
            <div className="mt-4 ">
              <button
                type="button"
                onClick={handleConfirm}
                className={`w-full rounded-md py-2 text-sm font-semibold text-white  ${
                  selectedFile && selectedSchema ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedFile || !selectedSchema}
              >
                Weiter
              </button>
            </div>
          </div>
          
    );
}