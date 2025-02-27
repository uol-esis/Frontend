import Table from "./Table"
import { useNavigate } from "react-router-dom";

export default function Preview(){
    const navigate = useNavigate();
    const people = [
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' }
        // More people...
      ]
    const headers = ["Index","Name", "Title", "Email", "Role"]



    return(
        <div>
             {/* Überschrift und Informationen zum Schema */}
            <h1 className="flex justify-content-left p-5 text-xl font-semibold">Vorschau</h1>
            <div className="flex justify-content-left pl-5 gap-20 text-lg font-semibold">
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
            <Table
            data={people}
            header={headers}
            />

             {/* Knöpfe */}
            <div className="flex p-5 mt-5 gap-300">
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
                >
                    Anwenden
                </button>
            </div>
        </div>
        

    );
}