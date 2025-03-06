import Table from "./Table"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from 'papaparse';
import { ApiClient, DefaultApi } from "th1";

export default function Preview(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);

    // {/*lädt CSV aus ausgewählter Datei*/}
    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     Papa.parse(file, {
    //         header: true,
    //         skipEmptyLines: true,
    //         complete: (results) => {
    //             setData(results.data)
    //         }
    //     });
    // };

    {/* lädt CSV aus Dateipfad*/}
    useEffect(() =>{
        const fetchData = async () => {
            const response = await fetch("/data.csv");
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData,{
                header: true,
                skipEmptyLines: true
            }).data;
            setData(parsedData)

        };
        fetchData();
    }, []);

    const uploadSchemata = function() {
        const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
        const api = new DefaultApi(client);
    
        const files = ["C:\Users\phill\Downloads\FILL_EMPTY_CELLS_ts2_OK1.json", 
                       "C:\Users\phill\Downloads\REMOVE_COLUMN_BY_INDEX_ts1_OK1.json", 
                       "C:\Users\phill\Downloads\FILL_EMPTY_CELLS_ts2_OK1.json"
        ];
        files.forEach(file => {
          api.createTableStructure(file);
        });
      }

    const getAllStructures = function(){
        const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
        const api = new DefaultApi(client); 
        console.log(api.getTableStructures());
    }

    const getCSV = () =>{
        const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
        const api = new DefaultApi(client);
        const tableStructureId = 789; // {Number} 
        const file = "/path/to/file"; // {File} 
        const callback = function(error, data, response) {
        if (error) {
        console.error(error);
        } else {
        console.log('API called successfully.');
        }
        };
        api.convertTable(tableStructureId, file, callback);
    }


    return(
        <div>
             {/* Überschrift und Informationen zum Schema */}
            <h1 className="flex justify-content-left p-2 text-xl font-semibold">Vorschau</h1>
            <div className="flex justify-content-left pl-2 gap-20 text-lg font-semibold">
                <div className="flex flex-col items-start">
                    <h2>Thema:</h2>
                    <p className="text-lg font-normal">Wohnräume</p>
                </div>
                <div className="flex flex-col items-start">
                    <h2>Name:</h2>
                    <p className="text-lg font-normal">2024-08-07 Hauptwohnsitzer</p>
                </div>
                <div className="flex flex-col items-start">
                    <h2>Datei:</h2>
                    <p className="text-lg font-normal">2024-08-07 Hauptwohnsitzer.xls</p>
                </div>
            </div>

            {/* Tabelle mit Vorschau */}
           {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
            {data.length ? (
                <Table
                    data={data}
                />
            ) : null}

             {/* Knöpfe */}
            <div className="flex p-2 mt-5 gap-[10vw] ">
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => navigate("/")}
                >
                    Zurück
                </button>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={getCSV}
                >
                    Anwenden
                </button>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={FileUpload}
                >
                    CreateTableStructure
                </button>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={getAllStructures}
                >
                    getAll
                </button>
                <input type="file" multiple onChange={handleFileChange} />
                
            </div>
        </div>
        

    );
}