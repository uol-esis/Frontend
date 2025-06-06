import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import InfoCard from "./components/InfoCard";

export default function Wiki() {

    const introductionRef = useRef();
    const addColNameRef = useRef();
    const fillEmptyRowRef = useRef();
    const fillEmptyColref = useRef();
    const removeColRef = useRef();
    const removeRowRef = useRef();
    const removeFooterRef = useRef();
    const removeHeaderRef = useRef();
    const replaceEntriesRef = useRef();
    const splitRowRef = useRef();
    const removeInvalidRowsRef = useRef();
    const removeTrailingColRef = useRef();
    const removeGroupedHeaderRef = useRef();

    const navigation = [
        { name: 'Einleitung', href: introductionRef },
        {
            name: 'Converter', href: '#', children: [
                { name: 'Gruppenüberschrift entfernen', href: removeGroupedHeaderRef },
                { name: 'Leere Zeilen ausfüllen', href: fillEmptyRowRef },
                { name: 'Leere Spalte ausfüllen', href: fillEmptyColref },
                { name: 'Spalte entfernen (nach Index)', href: removeColRef },
                { name: 'Zeile entfernen (nach Index)', href: removeRowRef },
                { name: 'Spalteüberschriften hinzufügen', href: addColNameRef },
                { name: 'Fußzeile entfernen', href: removeFooterRef },
                { name: 'Kopfzeile entfernen', href: removeHeaderRef },
                { name: 'Einträge ersetzen', href: replaceEntriesRef },
                { name: 'Zeile aufteilen', href: splitRowRef },
                { name: 'Ungültige Zeilen entfernen', href: removeInvalidRowsRef },
                { name: 'Nachträglich Spalten entfernen', href: removeTrailingColRef },
            ]
        }
    ]

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex h-full ">
            {/* Sidebar */}
            <div className="h-screen w-[15vw] fixed">
                <Sidebar onClick={scrollTo} navigation={navigation} />
            </div>

            {/* Wiki */}
            <div className="flex flex-col ml-[15vw] p-5 mb-5">

                {/* Introduction */}
                <section ref={introductionRef}>
                    <h2 className="text font-semibold text-lg"> Einleitung </h2>
                    <p> Work in Progress! </p>
                </section>

                <section className="mt-10">
                    <h2 className="text font-semibold text-lg" >Funktionen / Converter</h2>
                    <p>
                        Funktionen werden in der Ansicht "Tabellentransformation bearbeiten" verwendent.
                        Eine Funktion entspricht einem Bearbeitungsschritt, der auf die Tabelle angwendet wird.
                        Damit dieser Bearbeitungsschritt korrekt durchgeführt wird, braucht jede Funktion verschiedene Informationen, beispielsweise
                        Start- und Endreihe. Im Folgenden werden alle Funktionen aufgelistet und deren Funktionweise genauer erklärt.

                    </p>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove grouped header */}
                <section ref={removeGroupedHeaderRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Gruppenüberschrift entfernen</h2>
                    <p>
                        Mithilfe dieses Converters können Verschachtelungen in der Kopfzeile und in den Spalten aufgelöst werden.
                        Dabei müssen die Zeilen und Spalten angegeben werden, in der die Verschachtelungen auftreten. Dies ist notwendig,
                        da in der Datenbank keine Verschachtelungen auftreten dürfen und eine flache Struktur erforderlich ist

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "- Vorher muss der Converter \"Leere Zeilen ausfüllen\" angewendet werden, damit keine leeren Einträge in den Verschachtelungen auftreten \n" +
                                "- Wenn in den Spalten keine Verschachtelungen auftreten, dann kann beim Spaltenindex 0 eingetragen werden \n" +
                                "- Am Ende müssen die Spaltennamen mit dem Converter \"Spaltenüberschriften hinzufügen\" angepasst werden"
                            } />
                    </div>

                    {/* example 1 */}
                    <p className="text-left font-semibold mt-4">Beispiel 1: Verschachtelten Header auflösen</p>
                    <p className="text-left">
                        Vorher muss der Converter "Leere Zeilen ausfüllen" angewendet werden, damit keine leeren Einträge in den Verschachtelungen auftreten.
                        Zuerst müssen die beiden Zeilen, in der die Verschachtelung auftritt angegeben werden, also Zeile 1 und 2.
                        Dies muss bei Zeilennummer eingetragen werden. Da keine Verschachtelungen innerhalb der Spalten vorzufinden
                        sind kann bei Spaltennummer 0 eingetragen werden. Die nächsten beiden Angaben beziehen sich auf die Daten.
                        Es muss der Beginn der tatsächlichen Daten angegeben werden, in diesem Fall ist Stadtviertel eigentlich eine eigene Spalte,
                        also fangen die Daten bei Zeile 1 Spalte 3 an (bei dem Eintrag 35).
                        Wie am Ende zu sehen ist, sind nun die Spaltennamen undefined, diese müssen mit dem Converter "Spaltenüberschriften hinzufügen"
                        hinzugefügt werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeGroupedHeaderParameter1.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderStandard1.png" alt="" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderNew1.png" alt="" />

                        </figure>

                    </div>

                    {/* example 2 */}
                    <p className="text-left font-semibold mt-4">Beispiel 2: Verschachtelten Header und Spalten auflösen</p>
                    <p className="text-left">
                        Vorher muss der Converter "Leere Zeilen ausfüllen" mit Wert 0 und der Converter
                        "Leere Spalten ausfüllen" mit dem Wert 0,1 angewendet werden.
                        Bei diesem Beispiel sind nun auch Verschachtelungen innerhalb der Spalten. Dies erkennt
                        man daran, das innerhalb einer Spalte verschiedenen Überschriften stehen, z.B. in Spalte 0
                        sind die Überschriften: Geschlecht, 13 Altersgruppen und Sozialräume.
                        Eigentlich sollte es nur eine Überschrift pro Spalte geben. Deswegen muss nun bei Spaltennummern die Spalten
                        0, 1 und 2 angegeben werden. Die verschachtelten Zeilen sind 0 und 1, diese werden bei Zeilennummern eingetragen und
                        die tatsächlichen Daten beginnen bei Zeile 3 und Spalte 3. Dies wird bei Startzeile und Startspalte eingetragen.
                        Zum Schluss muss wieder mit dem Converter "Spaltenüberschriften hinzufügen" die Spaltennamen ergänzt werden.

                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeGroupedHeaderParameter2.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderStandard2.png" alt="" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderNew2.png" alt="" />

                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* fill empty row */}
                <section ref={fillEmptyRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Leere Zeilen ausfüllen</h2>
                    <p>
                        Nutzen Sie die Funktion "Leere Zeilen ausfüllen", wenn Sie leere Zellen in der von Ihnen angegebenen Zeile durch Werte, die links von den leeren Zellen stehen, ersetzen wollen.
                    </p>
                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        Die folgende Tabelle enthält zum Beispiel eine leere Zelle rechts von "Leistungen".
                        Um die Tabelle weiter bearbeiten zu können wie z. B. die Kopfzeile zu ändern,
                        müssen wir in der Zeile alle Zellen gefüllt haben. <br /> <br />
                        Wir geben für die Zeilennummer Zeile 1 an, da sich hier die leere Zelle rechts von "Leistungen" befindet.
                    </p>
                    <div className="flex justify-center">
                        <figure>
                            <figcaption></figcaption>
                            <img className="mt-5 object-contain w-[50vw] " src="wikiAssets/FillEmptyRow_Input.png" alt="fill empty row" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4">
                        <figure>
                            <figcaption className="font-semibold p-4"> Vorher </figcaption>
                            <img className="object-contain" src="wikiAssets/FillEmptyRow.png" alt="fill empty row" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher </figcaption>
                            <img className=" object-contain" src="wikiAssets/FillEmptyRow_Result.png" alt="fill empty row" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* fill empty column */}
                <section ref={fillEmptyColref} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Leere Spalten ausfüllen</h2>
                    <p>
                        Die Funktion "Leere Spalten ausfüllen" operiert von der Funktionsweise wie die Funktion "Leere Zeilen ausfüllen" bezogen auf Spalten. Sie füllt leere Zellen in der von Ihnen angegebenen Spalte durch Werte, die oberhalb der leeren Zellen stehen.
                    </p>
                    <p className="text-left font-semibold mt-4">Beispiel: </p>
                    <p className="text-left"> In der folgenden Tabelle sehen wir eine fiktive Auflistung von Familien mit der
                        Anzahl in ihr lebender schulpflichtiger Kinder, in einem bestimmten Stadtteil wohnend. Wir wollen nun die Stadtteile
                        in der Spalte "Stadtteil" auffüllen. <br /> <br />
                        Wir geben die Spalte 0 an, da "Stadtteil" die erste Spalte von links ist.
                    </p>
                    <div className="mt-5 flex justify-center">
                        <figure>
                            <figcaption></figcaption>
                            <img className="w-[50vw] object-contain" src="wikiAssets/FillEmptyColumn_Input.png" alt="fill empty column" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold">Vorher </figcaption>
                            <img className="h-[40vh] object-contain" src="wikiAssets/FillEmptyColumn.png" alt="fill empty column" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> Nachher</figcaption>
                            <img className="h-[40vh] object-contain" src="wikiAssets/FillEmptyColumn_Result.png" alt="fill empty column" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove column */}
                <section ref={removeColRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Spalte entfernen (nach Index)</h2>
                    <p>
                        Diese Funktion kann eine oder mehrere Spalten entfernen, indem der Index angegeben wird.
                        Bei der Angabe ist zu beachten, das die Spalte "Index" nicht mitgezählt wird und danach die Zählung bei 0 beginnt.
                        Wenn mehrere Spalten gelöscht werden sollen, müssen die Zahlen mit einem Komma und ohne Leerzeichen voneinander
                        getrennt werden.
                    </p>
                    <p className="text-left font-semibold mt-4">Beispiel: </p>
                    <p className="text-left">
                        Wir wollen im folgenden Beispiel die Spalte "Stadtviertel" am Anfang der Tabelle löschen.

                    </p>
                    <div className="flex justify-center">
                        <figure>
                            <img className="w-[50vw] object-contain" src="wikiAssets/RemoveColumn_Input.png" alt="remove Column" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold"> Vorher </figcaption>
                            <img className=" object-contain" src="/wikiAssets/standardTable.png" alt="remove Column" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> Nachher</figcaption>
                            <img className=" object-contain" src="/wikiAssets/RemoveColumn_Result.png" alt="remove Column" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove row */}
                <section ref={removeRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Zeile entfernen (nach Index)</h2>
                    <p>
                        Wenn Sie eine oder mehrere Zeilen gleichzeitig löschen möchten, können Sie dies mit der Funktion "Zeile entfernen (nach Index)" verwenden. Für die Zählung der Zeilen können Sie die Angaben in der Spalte "Index" nutzen. Bitte beachten Sie, dass die Kopfzeile Zeile 0 darstellt.
                        Alternativ kann auch die Funktion "Fußzeile entfernen" genutzt werden, wenn die zu löschende Zeile die letzte ist. Der Unterschied ist, dass bei letzteren keine Angaben gemacht werden müssen.
                    </p>
                    <p className="text-left font-semibold mt-4">Beispiel: </p>
                    <p className="text-left">
                        Hier wollen wir Zeile 1 und 2 löschen.
                    </p>
                    <div className="mt-5 flex justify-center">
                        <figure>
                            <img className="w-[50vw] object-contain" src="wikiAssets/RemoveRow_Input.png" alt="remove row" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold"> Vorher </figcaption>
                            <img className="object-contain" src="wikiAssets/standardTable.png" alt="remove row" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/RemoveRow_Result.png" alt="remove row" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* add column name */}
                <section ref={addColNameRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Spaltenüberschriften hinzufügen</h2>
                    <p>
                        Mithilfe dieses Converters können die Spaltennamen verändert werden.
                        Die Namen werden durch ein Komma getrennt und der erste Name wird auf die erste Spalte angewendet,
                        der zweite Name auf die zweite Spalte und so weiter.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "- Die Aufzählung der Spaltennamen ohne Leerzeichen schreiben, denn diese werden als Unterstrich angezeigt\n- undefined bedeutet, das für die Spalte kein Name vergeben wurde"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel: "Undefined" zu "Anzahl" ändern</p>
                    <p className="text-left">
                        Da die letzte Spalte undefined ist, also kein Name vergeben wurde, taucht dieser nicht in der Auflistung auf.
                        Also kann der neue Spaltenname "Anzahl" am Ende der Aufzählung hinzugefügt werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/addHeaderNameParameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/addHeaderNameStandard.png" alt="" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/addHeaderNameNew.png" alt="" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove footer */}
                <section ref={removeFooterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Fußzeile entfernen</h2>
                    <p>
                        Mit diesem Converter wird der Abschnitt unter den eigentlichen Daten entfernt.
                        Dies dient dazu, die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können.
                        Für die korrekte Verarbeitung der Daten wird nur die Tabelle benötigt. Andernfalls werden die Textzeilen als Daten angesehen
                        und in die Tabelle geschrieben.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "Dieser Converter funktioniert automatisch und es müssen keine weiteren Angaben gemacht werden"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">Bei dieser Tabelle wird der Text unter der Tabelle entfernt, also Zeile 80 und 81</p>
                    <img className="mt-5 object-contain" src="wikiAssets/removeFooter.png" alt="Kopfzeile entfernen Bild" />

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove header */}
                <section ref={removeHeaderRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Kopfzeile entfernen</h2>
                    <p>
                        Mit diesem Converter wird der Abschnitt über den eigentlichen Daten entfernt.
                        Dies dient dazu die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können.
                        Für die korrekte Verarbeitung der Daten wird nur die Tabelle benötigt. Andernfalls werden die Textzeilen als Daten angesehen
                        und in die Tabelle geschrieben.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "Dieser Converter funktioniert automatisch und es müssen keine weiteren Angaben gemacht werden"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">Bei dieser Tabelle werden der Text über der Tabelle, also Zeile 3 bis 7</p>
                    <img className="mt-5 object-contain" src="wikiAssets/removeHeader.png" alt="Kopfzeile entfernen Bild" />

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* replace entries */}
                <section ref={replaceEntriesRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Einträge ersetzen </h2>
                    <p>
                        Dieser Converter kann einzelne Einträge in der Tabelle ersetzen, um beispielsweise fehlerhafte Einträge zu korrigieren.
                        Dabei wird die gesamte Tabelle nach dem Suchbegriff durchsucht und anschließend durch den "Ersetzen durch" - Wert ersetzt.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Wenn der Suchbegriff mehrfach vorkommt, so werden alle Vorkommen durch den neuen Wert ersetzt"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel: "Stadtviertel" durch "Stadtteil" ersetzt</p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/replaceEntriesParameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/standardTable.png" alt="remove Column" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/replaceEntriesTable.png" alt="remove Column" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* split row */}
                <section ref={splitRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Zeile aufteilen </h2>
                    <p>
                        Bei Anwendung dieses Converters werden die Einträge der angegebenen Spalte in mehrere Zeilen aufgeteilt. Dies ist notwendig,
                        wenn sich in einer Zelle mehrere Einträge befinden.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Im Standardfall werden die Einträge nach einem Zeilenumbruch aufgeteilt"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        In der Spalte "Fallantragsbezeichnung" befinden sich in einer Zelle mehrerer Einträge,
                        diese sollen in separate Zeilen angegeben werden.
                        Dafür muss der Index der entsprechenden Spalte angegeben werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/splitRowParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/splitRowStandard.png" alt="remove Column" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/splitRowNew.png" alt="remove Column" />

                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove invalid rows */}
                <section ref={removeInvalidRowsRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Ungültige Zeilen entfernen </h2>
                    <p>
                        Dieser Converter entfernt ungültige Zeilen. Im Standardfall wird eine Zeile als ungültig angesehen, sobald sich mindestens
                        eine leere Zelle in dieser Zeile befindet. Dies kann dazu verwendet werden,
                        nur vollständige Zeilen für die Visualisierung zu verwenden.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"- Der Threshold gibt an, wie viele Einträge in einer Zeile korrekt gefüllt sein müssen, damit sie nicht gelöscht werden. \n " +
                                " - Komplett leere Zeilen werden immer gelöscht"}
                        />
                    </div>



                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        Wird der Threshold auf 1 gesetzt, so werden alle Zeilen mit mehr als einer korrekt befüllten Zelle behalten.
                        Dadurch wird Zeile 2 gelöscht , weil die Anzahl der korrekten Einträge
                        kleiner gleich dem Threshold ist. Die komplett leere Zeile wird immer gelöscht.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeInvalidRowParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/removeInvalidRowStandard.png" alt="remove Column" />

                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/removeInvalidRowNew.png" alt="remove Column" />

                        </figure>

                    </div>



                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove invalid columns at the end */}
                <section ref={removeTrailingColRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Nachträglich Spalten entfernen </h2>
                    <p>
                        Dieser Converter entfernt Spalten am Ende der Tabelle. Zum Beispiel wenn die letzen beiden Spalten der Tabelle
                        leer sind, so werden diese entfernt.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Es müssen keine weiteren Angaben gemacht werden"}
                        />
                    </div>

                </section>
            </div>
        </div>
    );
}