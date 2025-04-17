import NewPopup from "/src/NewPopup.jsx";
import { useEffect } from "react";



export default function UploadDialog({ dialogRef, onClose, dontShowAgain, setDontShowAgain, nextDialogRef }) {

    useEffect(() => {
        if(dontShowAgain){
          console.log("Hidepop true");
          localStorage.setItem("hidePopup", true);
        }
      }, [dontShowAgain]);

    return (
      <dialog ref={dialogRef} className="self-center justify-self-center bg-gray-100">
        <div>
          <NewPopup />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
            />
            <span>Tutorial das nächste Mal nicht mehr anzeigen</span>
          </label>
          <button
            type="button"
            className="p-5 m-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={() => {
              dialogRef.current?.close();
              nextDialogRef.current?.showModal();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    );
  }
  