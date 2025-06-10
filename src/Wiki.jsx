import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";

export default function Wiki() {

    const chapter1ref = useRef();
    const converterRef = useRef();
    const metabaseRef = useRef();

    const navigation = [
        {name: 'Einleitung', href: chapter1ref, current: true },
        {name: 'Funktionen', href: 'converterRef', children: [
                { name: 'Gruppenüberschriften entfernen', href:'#' },
                { name: 'Leere Zeilen ausfüllen', href:'#' },
                { name: 'Leere Spalte ausfüllen', href:'#' },
                { name: 'Spalte entfernen (nach Index)', href:'#' },
                { name: 'Zeile entfernen (nach Index)', href:'#' },
                { name: 'Spaltenüberschrift hinzufügen', href:'#' },
                { name: 'Fußzeile entfernen', href:'#' },
                { name: 'Kopfzeile entfernen', href:'#' },
                { name: 'Einträge ersetzen', href:'#' },
                { name: 'Zeile aufteilen', href:'#' },
                { name: 'Ungültige Zeilen entfernen', href:'#' },
                { name: 'Nachträgliche Spalten entfernen', href:'#' },
            ]},
        {name: 'Metabase', href: 'metabaseRef', children: [
                { name: 'Einstieg', href: '#'},
                { name: 'Visualisierung erstellen', href: '#'},
            ]},
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
            <div className="flex flex-col ml-[15vw] m-[5vh] p-5">
                <section ref={chapter1ref}>
                    <h2 className="text font-semibold text-lg"> Einleitung </h2>
                    <p> Work in Progress! Achtung: Hier sollte eine Einführung stehen, wie die Indizes zu lesen sind etc. Ist teils etwas verwirrend, weil der Index bei den Zeilen bei 1 beginnt, aber eigentlich schon bei 0 (wegen Kopfzeile) und so weiter...</p>
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
                                <img className="h-[70vh] object-contain" src="" alt="remove Group Header" />
                            </figure>

                            <figure>
                                <figcaption> Gruppenüberschrift "Leistungen" aufgelöst</figcaption>
                                <img className="h-[70vh] object-contain" src="" alt="remove Column" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Leere Zeilen ausfüllen</h2>
                    <p>
                        Nutzen Sie die Funktion "Leere Zeilen ausfüllen", wenn Sie leere Zellen in der von Ihnen angegebenen Zeile durch Werte, die links von den leeren Zellen stehen, ersetzen wollen.
                        <p className="text-left font-semibold mt-4">Beispiel: Die folgende Tabelle enthält zum Beispiel eine leere Zelle rechts von "Leistungen". Um die Tabelle weiter bearbeiten zu können wie z. B. die Kopfzeile zu ändern, müssen wir in der Zeile alle Zellen gefüllt haben.</p>
                        <div className="flex justify-center">
                            <figure>
                                <figcaption>Wir geben für die Zeilennummer Zeile 1 an, da sich hier die leere Zelle rechts von "Leistungen" befindet.</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyRow_Input.png" alt="fill empty row" />
                            </figure>
                        </div>
                        <div className="flex justify-around p-4">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyRow.png" alt="fill empty row" />
                            </figure>
                            <figure>
                                <figcaption>So sieht die Tabelle nach der Funktion aus.</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyRow_Result.png" alt="fill empty row" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Leere Spalten ausfüllen</h2>
                    <p>
                        Die Funktion "Leere Spalten ausfüllen" operiert von der Funktionsweise wie die Funktion "Leere Zeilen ausfüllen" bezogen auf Spalten. Sie füllt leere Zellen in der von Ihnen angegebenen Spalte durch Werte, die oberhalb der leeren Zellen stehen.
                        <p className="text-left font-semibold mt-4">Beispiel: In der folgenden Tabelle sehen wir eine fiktive Auflistung von Familien mit der Anzahl in ihr lebender schulpflichtiger Kinder, in einem bestimmten Stadtteil wohnend. Wir wollen nun die Stadtteile in der Spalte "Stadtteil" auffüllen.</p>
                        <div className="flex justify-center">
                            <figure>
                                <figcaption>Wir geben die Spalte 0 an, da "Stadtteil" die erste Spalte von links ist.</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyColumn_Input.png" alt="fill empty column" />
                            </figure>
                        </div>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyColumn.png" alt="fill empty column" />
                            </figure>
                            <figure>
                                <figcaption>Ergebnis der Funktion "Leere Spalte ausfüllen"</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/FillEmptyColumn_Result.png" alt="fill empty column" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Spalte entfernen (nach Index)</h2>
                    <p>
                        Diese Funktion kann eine oder mehrere Spalten entfernen, indem der Index angegeben wird.
                        Bei der Angabe ist zu beachten, das die Spalte "Index" nicht mitgezählt wird und danach die Zählung bei 0 beginnt.
                        Wenn mehrere Spalten gelöscht werden sollen, müssen die Zahlen mit einem Komma und ohne Leerzeichen voneinander
                        getrennt werden.
                        <p className="text-left font-semibold mt-4">Beispiel: Wir wollen im folgenden Beispiel die Spalte "Name" am Anfang der Tabelle löschen.</p>
                        <div className="flex justify-center">
                            <figure>
                                <figcaption>Wir geben den Spaltenindex (die Spaltennummer) 0 an. </figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/RemoveColumn_Input.png" alt="remove Column" />
                            </figure>
                        </div>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/RemoveColumn.png" alt="remove Column" />
                            </figure>
                            <figure>
                                <figcaption>Die Spalte "Name" ist gelöscht.</figcaption>
                                <img className="h-[70vh] object-contain" src="/public/wiki/converter/RemoveColumn_Result.png" alt="remove Column" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Zeile entfernen (nach Index)</h2>
                    <p>
                        Wenn Sie eine oder mehrere Zeilen gleichzeitig löschen möchten, können Sie dies mit der Funktion "Zeile entfernen (nach Index)" verwenden. Für die Zählung der Zeilen können Sie die Angaben in der Spalte "Index" nutzen. Bitte beachten Sie, dass die Kopfzeile Zeile 0 darstellt.
                        Alternativ kann auch die Funktion "Fußzeile entfernen" genutzt werden, wenn die zu löschende Zeile die letzte ist. Der Unterschied ist, dass bei letzteren keine Angaben gemacht werden müssen.
                        <p className="text-left font-semibold mt-4">Beispiel: Hier haben wir ein Zeilenduplikat, welches wir löschen möchten. Gemeint sind Zeilen 6 und 7.</p>
                        <div className="flex justify-center">
                            <figure>
                                <figcaption>Wir geben 6 für die zu löschende Zeile an.</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/RemoveRow_Input.png" alt="remove row" />
                            </figure>
                        </div>
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption>Original Tabelle </figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/RemoveRow.png" alt="remove row" />
                            </figure>
                            <figure>
                                <figcaption>Das Duplikat wurde entfernt.</figcaption>
                                <img className="h-[70vh] object-contain" src="../public/wiki/converter/RemoveRow_Result.png" alt="remove row" />
                            </figure>
                        </div>
                    </p>
                </section>

                <section ref={metabaseRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Einstieg finden</h2>
                    <p className="text-left font-semibold mt-4">Datei auswählen</p>
                    <p>
                        Nach der Weiterleitung zu Metabase starten Sie auf der Übersichtsseite der Datenbank. Hier sehen Sie die vorhandenen Tabellen, die bereits in die Datenbank hochgeladen wurden. Auch Ihre zuletzt hochgeladene Tabelle sollte hier zu finden sein.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public/wiki/metabase/Einstieg-1.png" alt="Dateiauswahl" />
                            </figure>
                        </div>
                        <p className="text-left font-semibold mt-4">Was kann ich tun?</p>
                        Sobald die Datei ausgewählt wurde, erscheinen die Daten. Es gibt zwei wichtige Funktionsbereiche: Oben rechts mit den Bearbeitungsmöglichkeiten der Daten wie Filtern, Zusammenfassen und mehr. Mit dem Button unten links gelangt man zu Visualisierungsoptionen.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public/wiki/metabase/Einstieg-2.png" alt="Funktionsbereiche" />
                            </figure>
                        </div>
                        <p className="text-left font-semibold mt-4">Wie filtere ich eine Tabelle?</p>
                        Wollen Sie die Tabelle nach bestimmten Eigenschaften filtern, wählen Sie den Filter-Button aus und wählen Sie zwischen den Spalten der Tabelle.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public/wiki/metabase/Einstieg-3.png" alt="Filter" />
                            </figure>
                        </div>
                        <p className="text-left font-semibold mt-4">Wie fasse ich einzelne Werte in der Tabelle zusammen?</p>
                        Wollen Sie Werte kumulieren oder ähnliches, wählen Sie den Zusammenfassung-Button aus und wählen Sie eine Funktion und eine Gruppierung. Eine Funktion sagt aus, was mit den Werten passieren soll wie zum Beispiel bei Summe die Summe aller relevanten Zellen oder bei Anzahl die Häufigkeit der Zellen mit demselben Inhalt. Die Gruppierung sagt aus, welche Spalte ausschlaggebend ist.
                        ACHTUNG/HIER MUSS EIN HINWEIS FELD HIN//Bitte beachten Sie: Haben Sie eine Zusammenfassung ausgewählt und wollen diese wieder löschen, müssen Sie erst die Gruppierung rausnehmen und dann die Funktion entfernen.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public/wiki/metabase/Einstieg-4.png" alt="Zusammenfassen" />
                            </figure>
                        </div>
                        <p className="text-left font-semibold mt-4">Wie visualisiere ich eine Tabelle?</p>
                        Wenn Sie Daten grafisch darstellen wollen, klicken Sie den Button "Visualisierung" und wählen eine Art der Darstellung. Mit dem runden Icon Tabelle gelangen Sie wieder zur Ursprungsform zurück.
                        Sie können jederzeit Daten filtern oder zusammenfassen.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[70vh] object-contain" src="public/wiki/metabase/Einstieg-6.png" alt="Visualisierung" />
                            </figure>
                        </div>
                    </p>
                </section>
            </div>
        </div>
    );
}