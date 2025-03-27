import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hidePopup = localStorage.getItem("hidePopup");
    if (!hidePopup && location.pathname === "/preview") {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hidePopup", "true");
    }
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center overflow-y-auto">
        <div className="bg-white  shadow-2xl max-w-lg w-full flex flex-col">
          {/* Scrollbarer Bereich für den Tutorial-Inhalt */}
          <div className="px-6 py-4 overflow-y-auto max-w-prose" style={{ maxHeight: "60vh" }}>
            <h1 className="text-2xl font-bold mb-4">
              Warum und wie Sie Excel-Tabellen optimieren müssen
            </h1>
            <p className="mb-4 text-left pl-5 ">
              Diese Anwendung verarbeitet Ihre Excel-Tabellen, um Daten in eine Datenbank zu importieren.
              Häufig sind diese Tabellen jedoch sehr verschachtelt oder unstrukturiert. Damit unsere
              Software die Daten richtig lesen und verarbeiten kann, müssen die Tabellen in ein
              „maschinenlesbares“ und „datenbankkonformes“ Format gebracht werden.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              1. Was bedeutet „maschinenlesbar“ und „datenbankkonform“?
            </h2>
            <p className="mb-4 text-left pl-5">
              <strong>Maschinenlesbar:</strong> Daten sind so formatiert, dass Computer sie
              problemlos verstehen und verarbeiten können – in klaren, getrennten Spalten und Zeilen.
            </p>
            <p className="mb-4 text-left pl-5">
              <strong>Datenbankkonform:</strong> Die Struktur entspricht den Anforderungen einer
              Datenbank:
              <ul className="list-disc ml-6">
                <li>Jede Spalte enthält nur eine Art von Information (z. B. nur Namen, nur Zahlen).</li>
                <li>Überschriften stehen eindeutig in der ersten Zeile.</li>
                <li>Keine verschachtelten oder zusammengeführten Zellen.</li>
              </ul>
            </p>
            <img src="./Verschachtelung1.png" alt="Vergleich unstrukturierte vs. optimierte Tabelle" className="my-4 mx-auto" />
            <p className="text-center text-sm mb-6">
              Bild: Oben – Verschachtelte Tabelle; Unten – Optimierte, klare Struktur.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              2. Warum müssen Tabellen überarbeitet werden?
            </h2>
            <h3 className="text-lg font-semibold mb-1">Problem 1: Verschachtelte Daten</h3>
            <p className="mb-4 text-left pl-5">
              Mehrere Überschriften und zusammengeführte Zellen erschweren es, Daten eindeutig zu
             zuordnen.
            </p>
            <img src="./Verschachtelung2.png" alt="Screenshot verschachtelte Tabelle" className="my-4 mx-auto" />
            <p className="text-center text-sm mb-6 mx-auto">
              Bild: Beispiel einer verschachtelten Tabelle mit zusammengeführten Zellen.
            </p>

            <h3 className="text-lg font-semibold mb-1">Problem 2: Uneinheitliche Formatierung</h3>
            <p className="mb-4 text-left pl-5">
              Unterschiedliche Formatierungen (wie Zahlen als Text) machen die automatische Verarbeitung
              schwierig.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              3. Wie sollte eine optimierte Tabelle aussehen?
            </h2>
            <ul className="list-disc ml-6 mb-4 text-left pl-5">
              <li>
                <strong>Klare Überschriften:</strong> Jede Spalte hat eine eindeutige Überschrift.
              </li>
              <li>
                <strong>Einheitliche Datenformate:</strong> Alle Werte in einer Spalte sind gleich formatiert.
              </li>
              <li>
                <strong>Keine zusammengeführten Zellen:</strong> Jede Zelle steht für sich.
              </li>
              <li>
                <strong>Flache Struktur:</strong> Eine Überschriftenzeile, gefolgt von den Daten.
              </li>
            </ul>
            <img src="./Verschachtelung3.png" alt="Optimierte Tabelle" className="my-4 mx-auto" />
            <p className="text-center text-sm mb-6">
              Bild: Optimierte Tabelle mit klaren Überschriften, einheitlichen Daten und ohne verschachtelte Zellen.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              4. Praktische Schritte zur Optimierung deiner Tabelle
            </h2>
            <h3 className="text-lg font-semibold mb-1 text-left pl-5">Schritt 1: Tabelle überprüfen</h3>
            <p className="mb-4 text-left pl-5">
              Überprüfen Sie, ob es zusammengeführte Zellen oder mehrere Überschriften gibt und ob jedes Feld
              ein einheitliches Format hat.
            </p>
            <h3 className="text-lg font-semibold mb-1 text-left pl-5">Schritt 2: Tabelle aufräumen</h3>
            <p className="mb-4 text-left pl-5">
              - <strong>Zusammengeführte Zellen auflösen:</strong> Jede Zelle sollte einen eindeutigen Wert
              enthalten.<br />
              - <strong>Eindeutige Überschriften erstellen:</strong> Sorgen Sie für klare Überschriften in der
              ersten Zeile.<br />
              - <strong>Format vereinheitlichen:</strong> Stelle sicher, dass alle Daten das gleiche Format haben.
            </p>
            <h3 className="text-lg font-semibold mb-1 text-left pl-5">Schritt 3: Testen und Importieren</h3>
            <p className="mb-4 text-left pl-5">
              Speichern Sie die optimierte Tabelle und importiere sie diese in unsere Anwendung oder führen Sie die Prüfung direkt in der Anwendung durch. Prüfen Sie, ob alle
              Daten korrekt verarbeitet werden.
            </p>

            <h2 className="text-xl font-semibold mb-2 text-left pl-5">Zusammenfassung</h2>
            <ul className="list-disc ml-6 mb-4 text-left pl-5">
              <li>
                <strong>Warum:</strong> Damit unsere App die Excel-Daten fehlerfrei verarbeiten kann.
              </li>
              <li>
                <strong>Was:</strong> Die Tabelle muss klar strukturierte, einheitliche Daten enthalten.
              </li>
              <li>
                <strong>Wie:</strong> Durch Auflösen zusammengeführter Zellen, klare Überschriften und einheitliche
                Formatierung.
              </li>
            </ul>
            
            <p className="mb-4 text-left pl-5">
              Mit diesen Schritten werden Ihre Tabellen optimal für den Import vorbereitet. Sollten Sie
              Fragen haben oder Unterstützung benötigen, wenden Sie sich bitte an unseren Support!
            </p>
          </div>

          {/* Immer sichtbarer Bereich mit Checkbox und Schließen-Button */}
          <div className="border-t px-6 py-4 flex flex-col">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={() => setDontShowAgain(!dontShowAgain)}
              />
              <span>Tutorial das nächste Mal nicht mehr anzeigen</span>
            </label>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={handleClose}
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    )
  );
}
