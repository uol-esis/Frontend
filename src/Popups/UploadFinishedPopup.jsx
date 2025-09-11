import { useNavigate } from "react-router-dom";

export default function UploadFinishedPopup({dialogRef}){
    const navigate = useNavigate();

    return(
        <dialog  className=" justify-self-center mt-[20vh] w-[30vw] shadow-md bg-white " ref={dialogRef}>
            <div className="flex flex-col place-items-center p-5 gap-5 bg-white">
                <img className="h-[15vh] w-[15vw] object-contain" src="greenHook.jpg" alt="Upload finished" />
                <p>The data was uploaded successfully</p>
            </div>
            
        </dialog>
    );
}