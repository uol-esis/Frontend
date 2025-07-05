const handleSaveFromCard = async (cardId, formData) => {
  // Logge die Formulardaten der gespeicherten Karte
  console.log(`Data saved from card ${cardId}:`, formData);

  // Aktualisiere den Kartenstatus im State
  setCards((prevCards) => {
    const updatedCards = prevCards.map((card) => {
      if (card.id === cardId) {
        // Setze formData und schalte die aktuelle Karte auf "nicht bearbeiten"
        return { ...card, formData, isEditing: false };
      } else if (card.id > cardId) {
        // Karten danach müssen neu berechnet werden → schalte sie auf "bearbeiten" und entferne alte Previews
        return { ...card, isEditing: true, preview: null };
      }
      return card;
    });

    // Filtere alle Karten bis zur aktuellen Karte (außer Startkarte) und kehre Reihenfolge um
    const filteredCards = updatedCards.filter((card) => card.id <= cardId && card.id !== 0).reverse();

    // Erzeuge die Datenstruktur für den Server-Call
    const structures = filteredCards.map((card) => {
      // Erzeuge das Eingabeobjekt für jeden Parameter
      const inputs = card.parameters.reduce((acc, param) => {
        const apiName = param.apiName;
        acc[apiName] = getValueFromFormData(param, card.formData);
        return acc;
      }, {});

      // Kombiniere Typ und Eingaben zu einer Struktur
      return {
        converterType: card.converterType,
        ...inputs,
      };
    });

    // Erzeuge das gesamte JSON für den Preview-Call
    const jsonData = {
      name: "Example Name", // (kann später durch echten Namen ersetzt werden)
      structures: structures,
      endRow: null,
      endColumn: null,
    };

    // Zeige das JSON in der Konsole
    console.log("Generated JSON:", JSON.stringify(jsonData, null, 2));

    // Hole Vorschau vom Server und aktualisiere die Karte damit
    getPreview(jsonData).then((previewData) => {
      if (previewData) {
        console.log("Preview Data:", previewData);
        setCards((latestCards) =>
          latestCards.map((card) =>
            card.id === cardId ? { ...card, preview: previewData } : card
          )
        );
      }
    });

    // Gib den aktualisierten Karten-State zurück
    return updatedCards;
  });
};

//---------------------------------------
function getValueFromFormData(param, formData) {
  const apiName = param.apiName; // API-Schlüssel aus dem Parameter
  const field = formData?.[apiName]; // Hole den Wert aus dem FormData

  if (param.type === 'string') {
    // Falls Pflichtfeld leer → gib leeren String zurück
    if (param.required && (!field || field.trim() === "")) {
      return "";
    } 
    // Falls kein Pflichtfeld und leer → gib undefined zurück
    else if (!param.required && (!field || field.trim() === "")) {
      return undefined;
    }
    return field; // sonst: normaler String
  }

  if (param.type === 'number') {
    // Falls es schon eine Zahl ist → gib zurück
    if (typeof field === 'number') {
      return field;
    }
    // Pflichtfeld leer → gib Hinweis auf ungültige Zahl
    if (param.required && (!field || field.trim() === "")) {
      return "invalid number";
    } 
    // Optional und leer → undefined
    else if (!param.required && (!field || field.trim() === "")) {
      return undefined;
    }
    return field; // sonst: Zahl (als String)
  }

  if (param.type === 'array') {
    // Falls schon ein Array → zurückgeben
    if (Array.isArray(field)) {
      return field;
    }
    // Pflichtfeld leer → gib leeres Array zurück
    if (param.required && (!field || field.trim() === "")) {
      return [];
    } 
    // Optional leer → undefined
    else if (!param.required && (!field || field.trim() === "")) {
      return undefined;
    }
    // String mit Kommas → splitten und trimmen
    return field.split(',').map(item => item.trim());
  }
}
//-------------------------------------
const handleEditComplete = () => {
  // Finde alle Karten, die noch im Bearbeitungsmodus sind
  const unsavedCards = cards.filter((card) => card.isEditing);
  if (unsavedCards.length > 0) {
    // Warne den Nutzer, wenn noch Karten ungespeichert sind
    alert("Bitte speichern Sie zuerst alle Karten.");
    return; // Abbrechen, falls nicht alles gespeichert
  }

  // Erzeuge finale Datenstruktur (JSON), Karte 0 ("Start") wird ignoriert
  const structures = cards.reverse().filter(card => card.id !== 0).map(card => {
    // Erzeuge Eingabeobjekt für jeden Parameter
    const inputs = card.parameters.reduce((acc, param) => {
      acc[param.apiName] = getValueFromFormData(param, card.formData);
      return acc;
    }, {});
    return {
      converterType: card.converterType,
      ...inputs,
    };
  });

  // JSON kann jetzt an den Server gesendet oder weiterverwendet werden
  const jsonData = {
    name: schemaToEdit.name, // Name des bestehenden Schemas
    structures: structures,
    endRow: null,
    endColumn: null,
  };

  // (An dieser Stelle endet dein Ausschnitt; vermutlich folgt gleich der finale API-Call oder Navigation)
};
