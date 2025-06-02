import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";

export default function Wiki() {

    const chapter1ref = useRef();
    const converterRef = useRef();
    const removeColumnRef = useRef();

    const navigation = [
        {name: 'Einleitung', href: chapter1ref, current: true },
        {name: 'Funktionen', href: 'converterRef', children: [
            { name: 'Gruppenüberschriften entfernen', href:'#' },
                { name: 'Leere Zeilen ausfüllen', href:'#' },
                { name: 'Spalte entfernen', href:'#' },
                { name: 'Spaltenüberschrift hinzufügen', href:'#' },
                { name: 'Fußzeile entfernen', href:'#' },
                { name: 'Kopfzeile entfernen', href:'#' },
                { name: 'Einträge ersetzen', href:'#' },
                { name: 'Zeile aufteilen', href:'#' },
                { name: 'Ungültige Zeilen entfernen', href:'#' },
                { name: 'Nachträgliche Spalten entfernen', href:'#' },
        ]}
    ]

    const scrollTo = (ref) => { 
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return(
        <div className="flex h-full ">
            {/* Sidebar */}
            <div className="h-screen w-[15vw] fixed">
                <Sidebar onClick={scrollTo} navigation={navigation}/>
            </div>

            {/* Wiki */}
            <div className="flex flex-col ml-[15vw] p-5">
                <section ref={chapter1ref}>
                    <h2 className="text font-semibold text-lg"> Einleitung </h2>
                    <p> Work in Progress</p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Funktionen</h2>
                    <p>
                        Funktionen werden in der Ansicht "Tabellentransformation bearbeiten" verwendent.
                        Eine Funktion entspricht einem Bearbeitungsschritt, der auf die Tabelle angwendet wird.
                        Damit dieser Bearbeitungsschritt korrekt durchgeführt wird, braucht jede Funktion verschiedene Informationen, beispielsweise
                        Start- und Endreihe. Im Folgenden werden alle Funktionen aufgelistet und deren Funktionweise genauer erklärt.

                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Gruppenüberschriften entfernen</h2>
                    <p>
                        Mit der Funktion "Gruppenüberschriften entfernen" lösen Sie mehrere Überschriften in der Tabelle auf.
                        Beachten Sie bitte folgendes: Wenn Sie Überschriften auflösen möchten, die sich über mehrere Spalten erstrecken, achten Sie darauf, dass diese Zellen sich am oberen Rand der Tabelle befinden und keine weiteren Zellen darüber enthalten. Gleiches gilt für Überschriften, die auf mehrere Zeilen verteilt sind. Diese Zeilen dürfen keine weiteren Zellen links von sich haben.
                        <p className="text-left font-semibold mt-4">Beispiel: Im folgenden haben wir eine Tabelle mit unterschiedlichen Überschriften in den Spalten. Die Überschrift "Leistungen" ist unterteilt in "Wohngeld" und "Grundsicherung". Diese Aufteilung wollen wir auflösen.</p>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="public\wiki/Gruppenueberschrift_vorher.png" alt="remove Group Header" />
                            </figure>

                            <figure>
                                <figcaption> Gruppenüberschrift "Leistungen" aufgelöst</figcaption>
                                <img className="h-[70vh] object-contain" src="public\wiki/RemoveColumn1.png" alt="remove Column" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Leere Zeilen ausfüllen</h2>
                    <p>
                        Nutzen Sie die Funktion "Leere Zeilen ausfüllen", wenn Sie leere Zellen in der von Ihnen angegebenen Zeile durch Werte, die links von den leeren Zellen stehen, ersetzen wollen.
                        <p className="text-left font-semibold mt-4">Beispiel: Die folgende Tabelle enthält zum Beispiel eine leere Zelle rechts von "Leistungen".</p>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="" alt="fill empty row" />
                            </figure>

                            <figure>
                                <img className="h-[70vh] object-contain" src="public\wiki/RemoveColumn1.png" alt="remove Column" />
                                <figcaption> Spalte "Anzahl" gelöscht</figcaption>
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={chapter1ref} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Spalte entfernen</h2>
                    <p>
                        Dieser Converter kann eine oder mehrere Spalten entfernen, indem der Index angegeben wird.
                        Bei der Angabe ist zu beachten, das die Spalte "Index" nicht mitgezählt wird und danach die Zählung bei 0 beginnt.
                        Wenn mehrere Spalten gelöscht werden sollen müssen die Zahlen mit einem Komma und ohne Leerzeichen voneinander
                        getrennt werden.
                        <p className="text-left font-semibold mt-4">Beispiel: Spalte "Anzahl" löschen</p>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public\wiki/RemoveColumn2.png" alt="remove Column" />
                                <figcaption>Original Tabelle </figcaption>
                            </figure>

                            <figure>
                                <img className="h-[70vh] object-contain" src="public\wiki/RemoveColumn1.png" alt="remove Column" />
                                <figcaption> Spalte "Anzahl" gelöscht</figcaption>
                            </figure>

                        </div>

                    </p>
                </section>


            </div>
        </div>
    );
}