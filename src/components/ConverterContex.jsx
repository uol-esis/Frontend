//wir legen eine zentrale Registry aller Converter speihern
//Wollen die Converter FUnktionen registieren damit später alle nacheinander gespeichert werden können

//und stellen eine Funktion bereit, die "SPeichern bis hierhin" aufruft
//Prüfen auch ob ein Coverter schon gespeichert wurde (isSafed)

import React, { createContext, useContext, useRef } from "react";

//Context selbst erstellen
const ConverterContext = createContext(null); //null damit wir später prüfen können, ob der Context existiert

//Provider erstellen
export function ConverterProvider({ children }) { 
    //die registtryReg speihert in einem Array alle Converter, jeweils it id und saveFn und durch useRef bleibt es über das Rerendern gleich. 
    //savesSetRef: hält fest welche Converter IDs schon gespeichert wurden...
    const savedSetRef = useRef(new Set()); //new Set erzeugt eine Menge, die nur eindeutige Werte speichern kann. useRef bedeutet dass .current übers rerendern hinweg gleich bleibt

    //haben wir hier eine ID noch nicht drin, dann fügen wir sie ein, geprüft wird das über die gemounteten Converter im DOM

    function registerConverter({id, saveFn}) {
        //prüfen ob die ID schon drin ist
        const exists = registryRef.current.some((entry) => entry.id === id);
        if (!exists) {
            //wenn nicht, dann fügen wir sie ein
            registryRef.current.push({ id, saveFn });
            console.log(`[ConverterContext] Registered Converter ID: ${id}`);
        } //wie genau funktioniert diese registryRef it dem push und some etc.?
    }

    async function saveUpTo(id) {
        console.log(`[ConverterContext] saveUpTo alled for ID=${id}`);

        //Als erstes kopieren und sortieren wir aufsteigend nach ID
        const sortedRegistry = registryRef.current
            .slice() // shallow copy
            .sort((a, b) => a.id - b.id); //die aufsteigend nach id sortiert ist

        //dann filtern wir nach den IDs <= id und die noch nicht gespeicherten
        //wie füge ich hier hinzu dass uns id=0 egal ist?
        const entriesToSave= sortedRegistry.filter(
            (entry) => entry.id !== 0 && entry.id <= id && !savedSetRef.current.has(entry.id)
        );

        //als drittes rufen wir sequentiell alle saveFn auf
        for (const entry of entriesToSave) {
            console.log(`[ConverterContext] Saving Converter ID: ${entry.id}`);
            try {
                //entry.saveFn soll die intern bestehende Save Logik handleSaveFromCard aufrufen
                await entry.saveFn(); //wir warten also bis es aufgerufen wurde
                savedSetRef.current.add(entry.id);  //wenn saveFn erfolgreich war, dann fügen wir die ID zum savedSetRef hinzu
                console.log[`[ConverterContext] Converter ID: ${entry.id} saved successfully.`];

            } catch (err) {
                console.error(`[ConverterContext] Error saving Converter ID: ${entry.id}:`, err);
                //fürs erste lassen wir es bei einem Fehler weiter laufen, könnten hier aber auh abbrechen
                }
        }
    }


function isSaved(id) {
    //prüfen ob die ID im savedSetRef drin ist
    return savedSetRef.current.has(id);
}

//was der Context für die Kinder bereitstellt (im return statement dann übergeben)
const contextValue = {
    registerConverter,
    saveUpTo,
    isSaved,
};

return (
    <ConverterContext.Provider value={contextValue}> 
      {children}
    </ConverterContext.Provider>
  );
} 

//Custom Hook, um in anderen Komponenten einfacher auf den Kontext zuzugreifen. Wenn kein Provider vorhanden ist werfen wir einen Fehler. 
export function useConverterContext() {
    const ctx = useContext(ConverterContext);
    if (!ctx) {
        throw new Error("useConverterContext must be used within a ConverterProvider");
    }
    return ctx;
}