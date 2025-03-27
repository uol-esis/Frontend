import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const location = useLocation(); //Begrenzung auf Seite

  useEffect(() => {
    const hidePopup = localStorage.getItem("hidePopup"); //local storage sucht Eintrag
    if (!hidePopup && location.pathname === "/preview") { 
      setShowPopup(true); //wenn kein Eintrag gesetzt -> angzeigt
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hidePopup", "true");
    }
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Tutorial: </p>
          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
            />
            <span>Tutorial das nächste mal nicht mehr anzeigen</span>
          </label>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleClose}
          >
            Schließen
          </button>
        </div>
      </div>
    )
  );
}
