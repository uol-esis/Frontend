import { useNavigate } from "react-router-dom";

export default function WorkInProgress(){
  const navigate = useNavigate();

  return(
    <div className="p-[5vh]">
      Work in Progress...

            

      {/* Knöpfe */}
      <div className="flex p-5 mt-5 gap-300">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/")}
        >
          Zurück
        </button>
      </div>
    </div>
    );
}