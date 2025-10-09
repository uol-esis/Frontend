import { useNavigate } from "react-router-dom";

export default function UploadFinishedPopup({dialogRef}){
    const navigate = useNavigate();

    return(
        <dialog  className=" justify-self-center mt-[20vh] w-[30vw] shadow-md bg-white " ref={dialogRef}>
            <div className="flex flex-col place-items-center p-5 gap-5 bg-white">
                <img className="h-[15vh] w-[15vw] object-contain" src="greenHook.jpg" alt="Upload finished" />
                <p>Die Daten wurden erfolgreich hochgeladen</p>
                <button
                    className="p-5 w-[15vw] rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {navigate("/upload")}}
                >
                    Weitere Datei hochladen
                </button>

                <button
                    className="p-5 w-[15vw] rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {navigate("/")}}
                >
                    Zurück zur Startseite
                </button>
                
            </div>
            
        </dialog>
    );
}