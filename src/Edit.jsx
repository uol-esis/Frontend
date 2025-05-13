import React, { useState } from "react";
import ConverterCard from "./components/ConverterCard";

export default function Edit() {
  // Liste aller Cards (mit initialer Start-Card)
  const [cards, setCards] = useState([['Start']]);

  // Definiere Converter-Buttons und ihre Parameter
  const converters = [
    { label: 'Gruppenüberschriften entfernen 🧹', params: ['Zeilennummer', 'Spaltennummer', 'Startzeile', 'Startspalte'] }, //RemoveGroupedHeader
    { label: 'Leere Zeilen ausfüllen ➕', params: ['Zeilennummer'] }, //FillEmptyRows
    {label: 'Spalte entfernen (nach Index) ❌', params: ['Spaltennummer']},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen 🏷️', params: ['Überschriftenliste (Kommagetrennt)']}, //AddHeaderNames
    {label: 'Fußzeile entfernen 📥 ', params: ['Treshold', 'Blacklist']}, //RemoveFooter
    {label: 'Kopfzeile entfernen 📋 ', params: ['Treshold', 'Blacklist']}, //RemoveHeader
    {label: 'Einträge ersetzen 🔄', params: ['Spaltennummer', 'Suchbegriff', 'Ersetzen durch','Startzeile', 'Startspalte', 'Endzeile', 'Endspalte' ]}, //ReplaceEntries
    {label: 'Zeile aufteilen ✂️ ', params: ['Spaltennummer', 'Trennzeichen', 'Startzeile', 'Endzeile']}, //SplitRow
    {label: 'Ungültige Zeilen entfernen 🚫', params: ['Treshold', 'Blacklist']}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen 🧽', params: ['Treshold', 'Blacklist']}, //RemoveTrailingColumns

    // weitere Converter hier hinzufügen
  ];

  // Handler für Button-Klick: fügt direkt neue Card hinzu
  const handleConverterClick = (params) => {
    setCards([params, ...cards]);
  };

  return (
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. HINTERGRUNDFARBE bei Designticket hier anpassen */}

      {/* Seitenüberschrift */}
      <h1 className="text-3xl font-bold mb-3 text-left p-4">Hier wird der Name des Schemas als Überschrift übergeben</h1>

      <div className="flex gap-8">
        
        {/* Linke Spalte: Converter-Buttons */}
        <div className="w-1/5 space-y-2 pl-4">
          {converters.map((conv) => (
            <button
              key={conv.label}
              onClick={() => handleConverterClick(conv.params)}
              className="w-full text-left px-4 py-2 bg-gray-600 hover:bg-indigo-500 text-white rounded-lg shadow"
            >
              {conv.label}
            </button>
          ))}
        </div>

        {/* Rechte Spalte: Cards */}
        <div className="w-3/4 space-y-4">
          {cards.map((params, idx) => (
            <ConverterCard key={idx} parameters={params} />
          ))}
        </div>
      </div>
    </div>
  );
}
