import { useNavigate } from "react-router-dom";
import arrow from './assets/arrow-right.svg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='flex justify-around items-around h-[85vh] bg-[#FEFAFA]'>
      <div className='flex flex-col justify-start w-[35vw] h-[70vh] mt-[5vh] divide-y divide-gray-200 rounded-lg bg-white shadow'>
        <div className="flex h-55% justify-center items-center">
          <img style={{ height: "auto", width: "60%", objectFit: "contain" }} src="/UploadPic.png" alt="Logo" />
        </div>
        <div className="flex flex-col flex-grow justify-between h-45% p-4">
          <p className='text-xl font-semibold'>Daten hochladen</p>
          <p className='flex-grow'>Excel Datein auswählen, anpassen und in die Datenbank hochladen.</p>
          <button
            type="button"
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate("/upload")}
          >
            Daten hochladen
          </button>
        </div>
      </div>

      <div className='flex flex-col justify-start w-[35vw] h-[70vh] mt-[5vh] divide-y divide-gray-200 rounded-lg bg-white shadow'>
        <div className="flex h-55% justify-center items-center">
          <img style={{ height: "auto", width: "60%", objectFit: "contain" }} src="/DataVisPic.png" alt="Logo" />
        </div>
        <div className="flex flex-col flex-grow justify-between h-45% p-4">
          <p className='text-xl font-semibold'>Datenvisualisierung</p>
          <p className='flex-grow'>Daten aus der Datenbank zu Diagrammen und Statistiken aufbereiten.</p>
          <button
            type="button"
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => window.location.href = import.meta.env.VITE_METABASE_ENDPOINT}
          >
            <div className="flex items-center justify-center g-3">
              Visualisierung
              <img src={arrow} alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;