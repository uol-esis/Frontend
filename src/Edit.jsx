import React, { useState } from "react";
import ConverterCard from "./components/ConverterCard";

export default function Edit() {
  // Liste aller Cards (mit initialer Start-Card)
  const [cards, setCards] = useState([{id: 0, parameters: [{name:'Start'}]}]);
  const [cardIdCounter, setCardIdCounter] = useState(1); //ID State

  const handleConverterClick = (params) => {
    const newCard = {id: cardIdCounter, parameters: params}; //Neue Card mit ID und Parametern
    setCards([newCard, ...cards]); //Neue Card wird an den Anfang der Liste gesetzt
    setCardIdCounter(cardIdCounter + 1); //ID wird um eins erhöht
  }

  // Definiere Converter-Buttons und ihre Parameter
  const converters = [
    { label: 'Gruppenüberschriften entfernen 🧹', params: [ {name: 'Zeilennummer', type: 'number', required: true}, {name: 'Spaltennummer', type: 'number', required: true}, {name:'Startzeile', type: 'number', required: false}, {name: 'Startspalte', type: 'number', required: false}] }, //RemoveGroupedHeader
    { label: 'Leere Zeilen ausfüllen ➕', params: [{name: 'Zeilennummer'}] }, //FillEmptyRows
    {label: 'Spalte entfernen (nach Index) ❌', params: [{name: 'Spaltennummer'}]},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen 🏷️', params: [{name: 'Überschriftenliste (Kommagetrennt)'}]}, //AddHeaderNames
    {label: 'Fußzeile entfernen 📥 ', params: [{name:'Treshold'}, {name:'Blacklist'}]}, //RemoveFooter
    {label: 'Kopfzeile entfernen 📋 ', params: [{name: 'Treshold'}, {name: 'Blacklist'}]}, //RemoveHeader
    {label: 'Einträge ersetzen 🔄', params: [{name: 'Spaltennummer'}, {name: 'Suchbegriff'}, {name: 'Ersetzen durch'},{name: 'Startzeile'}, {name: 'Startspalte'}, {name:'Endzeile'}, {name: 'Endspalte'} ]}, //ReplaceEntries
    {label: 'Zeile aufteilen ✂️ ', params: [{name:'Spaltennummer'}, {name: 'Trennzeichen'}, {name:'Startzeile'}, {name:'Endzeile'}]}, //SplitRow
    {label: 'Ungültige Zeilen entfernen 🚫', params: [{name:'Treshold'}, {name: 'Blacklist'}]}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen 🧽', params: [{name:'Treshold'}, {name:'Blacklist'}]}, //RemoveTrailingColumns

    // weitere Converter hier hinzufügen
  ];

  /* Handler für Button-Klick: fügt direkt neue Card hinzu
  const handleConverterClick = (params) => {
    setCards([params, ...cards]);
  };*/

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
          {cards.map((card) => (
            <ConverterCard key={card.id} id={card.id} parameters={card.parameters} />
          ))}
        </div>
      </div>
    </div>
  );
}
