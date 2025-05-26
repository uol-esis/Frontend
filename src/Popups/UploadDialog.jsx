import Popup from "/src/Popup.jsx";
import { useEffect } from "react";



export default function UploadDialog({ dialogRef, dontShowAgain, setDontShowAgain, nextDialogRef }) {

    useEffect(() => {
        if(dontShowAgain){
          localStorage.setItem("hidePopup", true);
        }
      }, [dontShowAgain]);

    return (
      <dialog ref={dialogRef} className="self-center justify-self-center shadow-md bg-gray-100">
          <Popup />
          <div className="flex flex-col mt-4 justify-content-center">
            <label>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={() => setDontShowAgain(!dontShowAgain)}
              />
              <span className="m-4">Tutorial das nächste Mal nicht mehr anzeigen</span>
            </label>
            
          </div>
          <button
              type="button"
              className="p-4 m-4 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              onClick={() => {
                dialogRef.current?.close();
                nextDialogRef.current?.showModal();
              }}
            >
              Weiter
            </button>
        
      </dialog>
    );
  }
  