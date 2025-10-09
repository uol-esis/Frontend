import { div } from "framer-motion/client";
import {useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import InfoCard from "./components/InfoCard";
import {href, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Wiki() {

    const [searchParams] = useSearchParams();
    const targetId = searchParams.get("targetId");
    const offset = searchParams.get("offset");

    const introductionRef = useRef();
    const databaseRef = useRef();
    const addColNameRef = useRef();
    const fillEmptyRowRef = useRef();
    const fillEmptyColRef = useRef();
    const removeColRef = useRef();
    const removeRowRef = useRef();
    const removeFooterRef = useRef();
    const removeHeaderRef = useRef();
    const replaceEntriesRef = useRef();
    const splitRowRef = useRef();
    const removeInvalidRowsRef = useRef();
    const removeTrailingColRef = useRef();
    const removeGroupedHeaderRef = useRef();
    const metabaseRef = useRef();
    const metabaseEinstiegRef = useRef();
    const metabaseFilterRef = useRef();
    const metabaseSummaryRef = useRef();
    const metabaseVisualisierungRef = useRef();
    const metabaseJoinRef = useRef();
    const pivotMatrixRef = useRef();
    const removeLeadingColumnRef = useRef();
    const removeKeywordRef  = useRef();
    const transposeMatrixRef = useRef();

    const [enlargedImage, setEnlargedImage] = useState(null);

    const refsMap = {
    "database": databaseRef,
    "groupHeader": removeGroupedHeaderRef,
  };

    useEffect(() => {
        if (targetId && refsMap[targetId]) {
            scrollToWithOffset(refsMap[targetId], offset);
        }
    }, [targetId]);

    //clickable picture
    const renderImage = (src, alt) => (
        <img
        src={src}
        alt={alt}
        className="my-4 mx-auto cursor-pointer"
        onClick={() => setEnlargedImage(src)}
        />
    );

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });


    const navigation = [
        { name: 'Einleitung', href: introductionRef },
        { name: 'Datenbankkonforme Daten', href: databaseRef },
        {
            name: 'Converter', href: '#', children: [
                { name: 'Gruppenüberschrift entfernen', href: removeGroupedHeaderRef },
                { name: 'Leere Zeilen ausfüllen', href: fillEmptyRowRef },
                { name: 'Leere Spalte ausfüllen', href: fillEmptyColRef },
                { name: 'Spalte entfernen (nach Index)', href: removeColRef },
                { name: 'Zeile entfernen (nach Index)', href: removeRowRef },
                { name: 'Spalteüberschriften hinzufügen', href: addColNameRef },
                { name: 'Fußzeile entfernen', href: removeFooterRef },
                { name: 'Kopfzeile entfernen', href: removeHeaderRef },
                { name: 'Einträge ersetzen', href: replaceEntriesRef },
                { name: 'Zeile aufteilen', href: splitRowRef },
                { name: 'Ungültige Zeilen entfernen', href: removeInvalidRowsRef },
                { name: 'Nachträglich Spalten entfernen', href: removeTrailingColRef },
                { name: 'Spalten am Anfang entfernen', href: removeLeadingColumnRef},
                { name: 'Zeile oder Spalte nach Stichwort löschen', href: removeKeywordRef},
                { name: 'Achsen tauschen', href: transposeMatrixRef},
                { name: 'Pivot Matrix', href: pivotMatrixRef},
            ]},
        {name: 'Metabase', href: '#', children: [
                { name: 'Einstieg', href: metabaseEinstiegRef},
                { name: 'Daten filtern', href: metabaseFilterRef},
                { name: 'Daten zusammenfassen', href: metabaseSummaryRef},
                { name: 'Visualisierung erstellen', href: metabaseVisualisierungRef},
                { name: 'Unterschiedliche Tabellen verbinden', href: metabaseJoinRef},
            ]},
    ]

    const scrollToWithOffset = (ref, offset = window.innerHeight * 0.15) => {
        console.log(offset);
        const element = ref.current;
        if (!element) return;

        const topPos = element.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
    };

    return(
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed h-[90vh] w-[15vw] overflow-y-auto">
                    <Sidebar onClick={scrollToWithOffset} navigation={navigation} />
            </div>

            {/* Wiki */}
            <section className="flex flex-col ml-[15vw] mb-[5vh] p-5">

                {/* Introduction */}
                <section ref={introductionRef}>
                    <h2 className="text font-semibold text-lg"> Einleitung </h2>
                     <p> 
                        Dieses Wiki dient als zentrale Wissensbasis rund um die Nutzung des Tools Th1nk. 
                        Ziel ist es, einen klaren Überblick über die bereitgestellten Funktionen, 
                        deren Einsatzmöglichkeiten sowie Best Practices für die tägliche Arbeit mit Daten zu geben.

                        Im ersten Abschnitt wird gezeigt, wie die Daten optimal für den Upload in die Datenbank aussehen sollten. 
                        Anschließend werden die Funktionen beschrieben, also die einzelnen Converter. 
                        Nutzer:innen erfahren hier, wofür die Converter verwendet werden können und wie sie funktionieren. 
                        Zusätzlich gibt es Beispiele für ein besseres Verständnis.

                        Der zweite Schwerpunkt liegt auf der Datenvisualisierung mit Metabase. Hier bietet das Wiki eine praxisnahe Anleitung: 
                        Von den ersten Schritten, über die Erstellung von Dashboards bis hin zu Filterfunktionen. 
                    </p>
                </section>

                <section className="mt-10">
                    <h2 className="text font-semibold text-lg" >Funktionen / Converter</h2>
                    <p>
                        Funktionen werden in der Ansicht "Tabellentransformation bearbeiten" verwendet.
                        Eine Funktion entspricht einem Bearbeitungsschritt, der auf die Tabelle angewandt wird.
                        Damit dieser Bearbeitungsschritt korrekt durchgeführt wird, braucht jede Funktion verschiedene Informationen, beispielsweise
                        Start- und Endzeile. Im Folgenden werden alle Funktionen aufgelistet und deren Funktionweise genauer erklärt.

                    </p>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* database info */}
                <section ref={databaseRef}>
                    <h2 className="text font-semibold text-lg mt-5"> Datenbankkonforme Daten </h2>
                    <h1 className="text-lg font-semibold mb-4">
                        Warum und wie Sie Excel-Tabellen optimieren müssen
                    </h1>
                    <p className="mb-4 text-left pl-5">
                        Diese Anwendung verarbeitet Ihre Excel-Tabellen, um Daten in eine
                        Datenbank zu importieren. Häufig sind diese Tabellen jedoch sehr
                        verschachtelt oder unstrukturiert. Damit unsere Software die Daten
                        richtig lesen und verarbeiten kann, müssen die Tabellen in ein
                        „maschinenlesbares“ und „datenbankkonformes“ Format gebracht werden.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">
                        1. Was bedeutet „maschinenlesbar“ und „datenbankkonform“?
                    </h2>
                    <p className="mb-4 text-left pl-5">
                        <strong>Maschinenlesbar:</strong> Daten sind so formatiert, dass
                        Computer sie problemlos verstehen und verarbeiten können – in klaren,
                        getrennten Spalten und Zeilen.
                    </p>
                    <div className="mb-4 text-left pl-5">
                        <strong>Datenbankkonform:</strong> Die Struktur entspricht den
                        Anforderungen einer Datenbank:
                        <ul className="list-disc ml-6">
                            <li>
                                Jede Spalte enthält nur eine Art von Information (z. B. nur Namen,
                                nur Zahlen).
                            </li>
                            <li>Überschriften stehen eindeutig in der ersten Zeile.</li>
                            <li>Keine verschachtelten oder zusammengeführten Zellen.</li>
                        </ul>
                    </div>
                    {renderImage("/Verschachtelung1.png", "Vergleich unstrukturierte vs. optimierte Tabelle")}
                    <p className="text-center text-sm mb-6">
                        Bild: Oben – Verschachtelte Tabelle; Unten – Optimierte, klare Struktur.
                    </p>

                    
                    <h2 className="text-xl font-semibold mb-2">
                        2. Wie sollte eine optimierte Tabelle aussehen?
                    </h2>
                    <ul className="list-disc ml-6 mb-4 text-left pl-5">
                        <li>
                        <strong>Klare Überschriften:</strong> Jede Spalte hat eine eindeutige
                        Überschrift.
                        </li>
                        <li>
                        <strong>Einheitliche Datenformate:</strong> Alle Werte in einer Spalte
                        sind gleich formatiert.
                        </li>
                        <li>
                        <strong>Keine zusammengeführten Zellen:</strong> Jede Zelle steht für
                        sich.
                        </li>
                        <li>
                        <strong>Flache Struktur:</strong> Eine Überschriftenzeile, gefolgt von den
                        Daten.
                        </li>
                    </ul>
                    {renderImage("/Verschachtelung3.png", "Optimierte Tabelle")}
                    <p className="text-center text-sm mb-6">
                        Bild: Optimierte Tabelle mit klaren Überschriften, einheitlichen Daten und
                        ohne verschachtelte Zellen.
                    </p>

                    

                    <h2 className="text-xl font-semibold mb-2 text-left pl-5">
                        Zusammenfassung
                    </h2>
                    <ul className="list-disc ml-6 mb-4 text-left pl-5">
                        <li>
                        <strong>Warum:</strong> Damit unsere App die Excel-Daten fehlerfrei
                        verarbeiten kann.
                        </li>
                        <li>
                        <strong>Was:</strong> Die Tabelle muss klar strukturierte, einheitliche
                        Daten enthalten.
                        </li>
                        <li>
                        <strong>Wie:</strong> Durch Auflösen zusammengeführter Zellen, klare
                        Überschriften und einheitliche Formatierung.
                        </li>
                    </ul>

                    <p className="mb-4 text-left pl-5">
                        Mit diesen Schritten werden Ihre Tabellen optimal für den Import
                        vorbereitet. Sollten Sie Fragen haben oder Unterstützung benötigen,
                        wenden Sie sich bitte an unseren Support!
                    </p>
                    
                    {/* make pictures bigger */}
                    {enlargedImage && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-transparent"
                        onClick={() => setEnlargedImage(null)}
                        >
                        <div
                            className="w-2/3 relative shadow-lg"
                            onClick={(e) => e.stopPropagation()} // Verhindert, dass Klicks im Container das Schließen auslösen
                        >
                            <img
                            src={enlargedImage}
                            alt="Vergrößert"
                            className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                    )}
    
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
                <section ref={fillEmptyColRef} className="mt-10">
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
                        der zweite Name auf die zweite Spalte und so weiter. <br/>
                        Es kann ausgewählt werden, ob die bestehenden Spaltenüberschriften ersetzt werden sollen
                        oder ob darüber eine neue Zeile mit den neuen Namen erstellt wird. Letzteres ist hilfreich, wenn die Ursprungstabelle keine 
                        Spaltenüberschriften hat, sondern direkt mit den eigentlichen Daten beginnt, dann werden die Daten, die fälschlicherweise in der ersten Zeile
                        stehen nicht überschrieben.

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
                        Zusätzlich muss angegeben werden in welchen Spalten nach dem Suchbegriff gesucht werden soll.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"- Wenn der Suchbegriff mehrfach vorkommt, so werden alle Vorkommen durch den neuen Wert ersetzt \n"+ 
                                "- Um Einträge im Header (Zeile 0) zu ersetzen muss der Converter \"Spaltenüberschriften hinzufügen\" verwendet werden"
                            }
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel: "Neustadt" durch "Nordstadt Nord" ersetzen</p>

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
                            <img className="object-contain" src="wikiAssets/replaceEntriesNew.png" alt="remove Column" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* split cell */}
                <section ref={splitRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Zelle aufteilen </h2>
                    <p>
                        Bei Anwendung dieses Converters werden die Einträge der angegebenen Spalte in mehrere neue Zeilen oder Spalten aufgeteilt. Dies ist notwendig,
                        wenn sich in einer Zelle mehrere Werte befinden. In der Datenbank darf in jeder Zelle, allerdings nur ein Wert stehen, deswegen müssen die
                        Werte auf mehrere Zeilen oder Spalten aufgeteilt werden.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"- Im Standardfall werden die Einträge nach einem Zeilenumbruch aufgeteilt \n" + 
                                "- Bei den optionalen Parametern kann ein anderes Trennzeichen angegeben werden"
                            }
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        In der Spalte "Fallantragsbezeichnung" befinden sich in einer Zelle mehrerer Einträge,
                        diese sollen in separate Zeilen angegeben werden.
                        Dafür muss der Index der entsprechenden Spalte angegeben werden. Da hier die Einträge durch einen Zeilenumbruch getrennt sind
                        muss bei den optionalen Parameter kein Trennzeichen angegeben werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/splitCellParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 gap-5 ">
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
                        Dieser Converter entfernt Spalten am Ende der Tabelle. Zum Beispiel wenn die letzten beiden Spalten der Tabelle
                        leer sind, so werden diese entfernt.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Es müssen keine weiteren Angaben gemacht werden"}
                        />
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove leading columns */}
                <section ref={removeLeadingColumnRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Spalten am Anfang entfernen</h2>
                    <p>
                        Dieser Converter entfernt ungültige Spalten, die sich am Anfang der Tabelle befinden. Standardmäßig werden komplett leere Spalten gelöscht. 
                        Mit der Blocklist können weitere Werte angegeben werden, die als ungültig gelten sollen und somit wird eine Spalte gelöscht, falls sie diese Werte beinhaltet.
                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={"Um gezielt Spalten zu entfernen sollte der Converter \"Spalte entfernen (nach Index)\" genutzt werden"}
                        />
                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove by keyword */}
                <section ref={removeKeywordRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Zeile oder Spalte nach Stichwort löschen </h2>
                    <p>
                        Dieser Converter entfernt Spalten und oder Zeilen, die angegebene Stichwörter beinhalten. Zusätzlich kann
                        angegeben werden, ob die Groß- und Kleinschreibung berücksichtigt werden soll und ob das Stichwort exakt so vorkommen muss oder ob es reicht, 
                        wenn es Teil eines Wortes ist.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"- Achtung bei der Genauigkeit \"Beinhaltet Stichwort\" kann es zu ungewünschtem Verhalten kommen, z.B. wenn das Wort \"und\" gelöscht werden soll, dann wird auch beispielsweise Gesundheitszustand gelöscht \n "}
                        />
                    </div>



                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        In diesem Fall sollen alle Zeilen gelöscht werden in denen das Wort Straße vorkommt.
                        Da Straße nicht als einzelnes Wort vorkommt muss bei Genauigkeit "Beinhaltet Stichwort" ausgewählt werden
                        und da bei der Eingabe Straße großgeschrieben wurde, es aber in den Daten nur kleingeschrieben ist muss die
                        Groß- und Kleinschreibung ignoriert werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeKeywordParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/removeKeywordStandard.png" alt="remove Column" />

                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/removeKeywordNew.png" alt="remove Column" />

                        </figure>
                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* transpose matrix */}
                <section ref={transposeMatrixRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Achsen tauschen </h2>
                    <p>
                        Mit diesem Converter werden die Spalten zu Zeilen umgewandelt. Dies kann bei bestimmten Tabellen zu einer übersichtlicheren Struktur führen.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Es müssen keine Parameter angegeben werden \n "}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    <p className="text-left">
                        Bei dieser Tabelle wird die Struktur so verändert, dass die Jahreszahlen die sich über mehrere Spalten erstrecken in einer Spalte gebündelt werden
                        Außerdem werden die Altersgruppen, die sich über mehrere Zeilen erstrecken nun in Spalten dargestellt. Zum Schluss können die leeren Spalten 
                        mit dem Converter "Spalten entfernen (nach Index)" gelöscht werden.
                    </p>

                    <div className="flex justify-around p-4 gap-5 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/TransposeMatrixStandard.png" alt="remove Column" />

                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/TransposeMatrixNew.png" alt="remove Column" />

                        </figure>
                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"/>

                {/* Pivot Matrix */}
                <section ref={pivotMatrixRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Pivot Matrix </h2>
                    <p>
                        Dieser Converter kann thematisch gleiche Spalten in einer neuen Spalte zusammenfassen und die dazugehörigen Werte übernehmen.
                        Bei "Neuer Spaltenname" wird der Name für die neu entstehende Spalte festgelegt. Bei den Spaltennummern müssen die 
                        Indizes der thematisch gleichen Spalten angegeben werden. Bei dem optionalen Parameter "Blockindizes" müssen alle restlichen Spalten angegeben werden,
                        die nicht in der neuen Spalte zusammengefasst werden sollen. 
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"Spalten, die nicht bei Spaltennummern eingetragen sind müssen in die optionalen Blockindizes geschrieben werden"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel 1: Einen Abschnitt umwandeln</p>
                    <p className="text-left">
                        Bei diesem Beispiel werden die Spalten, in denen das Alter angegeben ist in einer neuen Spalte "Altersgruppen" zusammengefasst.
                        Die Spalte "Gegenstand der Nachweisung" beinhaltet Jahreszahlen auf die sich die Altersgruppen beziehen, deswegen soll diese Spalte erhalten bleiben
                        und muss in die Blockindizes eingetragen werden.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="w-[50vw] mt-5 object-contain" src="wikiAssets/pivotParameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 gap-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/pivotStandard.png" alt="remove Column" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/pivotNew.png" alt="remove Column" />

                        </figure>

                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel 2: Zwei Abschnitte umwandeln</p>
                    <p className="text-left">
                        Bei dieser Tabelle gibt es zusätzlich zu den Daten aus dem ersten Beispiel nochmal den gleichen Aufbau mit der Bevölkerung und Pflegebedürftige.
                        Jetzt werden zwei Umformungen durchgeführt: Die neue Spalte Kategorie umfasst Bevölkerung und Pflegebedürftige und die zweite
                        neue Spalte Altersgruppen beinhaltet alle Altersgruppen aus Bevölkerung und Pflegebedürftige. Bei der Blocklist muss
                        wieder die Spalte mit den Jahreszahlen angegeben werden. Zusätzlich kann bei "Lücken füllen in Spalten" der Spaltenname angegeben werden, damit
                        bei einem leeren Eintrag der Wert aus der vorherigen Zeile übernommen wird. Ohne diese Angabe würde nur in einer Zeile Pflegebedürftige und Bevölkerung stehen und nicht in allen.
                        <br/>
                        Mit dem Converter "Einträge ersetzen" könnte man die leeren Einträge bei Altersgruppen mit einem passenden Begriff ersetzen.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameter </figcaption>
                            <img className="w-[50vw] mt-5 object-contain" src="wikiAssets/pivot2Parameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 gap-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Vorher </figcaption>
                            <img className=" object-contain" src="wikiAssets/pivot2Standard.png" alt="remove Column" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> Nachher</figcaption>
                            <img className="object-contain" src="wikiAssets/pivot2New.png" alt="remove Column" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"/>

                {/* Metabase */}
                <section className="mt-10">
                    <h1 className="text font-bold text-lg" ref={metabaseRef}>Metabase</h1>
                    <h2 className="text font-semibold text-lg" ref={metabaseEinstiegRef} >Einstieg finden</h2>
                    <p className="text-left font-semibold mt-4">Welche Bereiche hat Metabase?</p>
                    Nach der Weiterleitung zu Metabase starten Sie auf der Übersichtsseite der Modelle. Erstellen Sie oben rechts mit dem Button "Neu" und dann "Modell" ein Modell mit den Daten, die Sie gerne bearbeiten oder analysieren wollen.<br />
                        <br /> Ein Modell ist eine Ansicht bestimmter Daten, quasi eine Kopie. Dies hat den Vorteil, dass Sie nicht direkt mit den "Orignialdaten" in der Datenbank arbeiten und diese in ihrer ursprünglichen Form bleiben.
                        <br /> Sie haben links noch die Bereiche "Datenbanken" und "Metrik". Im Bereich "Datenbanken" haben Sie Einsicht in alle Tabellen, die sich in der Datenbank befinden. Im Bereich "Metrik" können Sie Indizes oder Key Performance Indicators (kurz KPIs) erstellen und einsehen. Diese können unter anderem in Dashboards eingebunden werden.

                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-1.png" alt="Bereiche" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4">Was kann ich tun?</p>
                    Sobald Sie ein neues Modell erstellt und eine Datei ausgewählt haben, erscheinen die Daten. Es gibt zwei wichtige Funktionsbereiche: Oben rechts mit den Bearbeitungsmöglichkeiten der Daten wie Filtern, Zusammenfassen und mehr. Mit dem Button unten links gelangt man zu Visualisierungsoptionen.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-2.png" alt="Funktionsbereiche" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseFilterRef}>Wie filtere ich eine Tabelle?</p>
                    Wollen Sie die Tabelle nach bestimmten Eigenschaften filtern, wählen Sie den Filter-Button aus und wählen Sie zwischen den Spalten der Tabelle.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-3.png" alt="Filter" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseSummaryRef}>Wie fasse ich einzelne Werte in der Tabelle zusammen?</p>
                    Wollen Sie Werte kumulieren oder ähnliches, wählen Sie den Zusammenfassung-Button aus und wählen Sie eine Funktion und eine Gruppierung. Eine Funktion sagt aus, was mit den Werten passieren soll wie zum Beispiel bei Summe die Summe aller relevanten Zellen oder bei Anzahl die Häufigkeit der Zellen mit demselben Inhalt. Die Gruppierung sagt aus, welche Spalte ausschlaggebend ist.

                    <div className="p-5">
                        Schritt 1:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-4.png" alt="Zusammenfassen" />
                        </figure>
                    </div>
                        <div className="p-4">
                            <InfoCard
                                text={"Bitte beachten Sie: Haben Sie eine Zusammenfassung ausgewählt und wollen diese wieder löschen, müssen Sie erst die Gruppierung rausnehmen und dann die Funktion entfernen."}
                            />
                        </div>
                    <div className="p-5">
                        Schritt 2:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-4a.png" alt="Zusammenfassen" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseVisualisierungRef}>Wie visualisiere ich eine Tabelle?</p>

                    <div className="p-5">
                        Wenn Sie Daten grafisch darstellen wollen, klicken Sie den Button "Visualisierung" und wählen eine Art der Darstellung. Mit dem runden Icon "Tabelle" gelangen Sie wieder zur Ursprungsform zurück.
                        Sie können jederzeit Daten filtern, zusammenfassen oder die Darstellungsform ändern. Gleitet der Cursor über eines der Darstellungsicons, erscheint ein kleines Rädchen für weitere Einstellungen der Grafik.
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-5.png" alt="Visualisierung" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4">Wie lege ich die Daten über eine Karte?</p>
                    <div className="p-5">
                        Wenn Sie Ihre Daten über eine Stadtkarte von Ulm legen wollen, nutzen Sie die Darstellungsform "Karte" und wählen Ihre Karte in den Einstellungen aus.
                    </div>

                    <div className="p-5">
                        Schritt 1:
                    </div>
                        <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6.png" alt="Karte" />
                        </figure>
                    </div>

                    <div className="p-5">
                        Schritt 2:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6a.png" alt="Karte" />
                        </figure>
                    </div>

                    <div className="p-5">
                        Ergebnis:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6b.png" alt="Karte" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseJoinRef}>Wie kann ich unterschiedliche Tabellen miteinander verbinden?</p>

                    <div className="p-5">
                    Sie haben unterschiedliche Tabellen, die Sie miteinander verbinden wollen. Im Fachjargon nennt man das "Tabellen joinen". Dies dient dazu, die Tabelle i. d. Regel zu erweitern. Voraussetzung dafür ist das Vorhandensein einer gemeinsamen Spalte. Es muss in beiden Tabellen, die man joinen möchte, eine Spalte geben, in der die Werte von der Bedeutung und der Schreibweise übereinstimmen.
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                    Wir wollen herausfinden, wie die Altersverteilung der Bürger über die Sozialräume aussieht. Uns liegen folgende Tabellen vor.
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Tabelle 1: Anzahl der Bürger eines Alters und Geschlechts pro Stadtviertel</figcaption>
                                <img className=" object-contain" src="wikiAssets/metabase/Einstieg-7a.png" alt="Tabelle1" />
                            </figure>
                            <figure>
                                <figcaption className="font-semibold p-4">Tabelle 2: Zuordnung der Straßen zu Stadtvierteln, -teilen und Sozialräumen</figcaption>
                                <img className="object-contain" src="wikiAssets/metabase/Einstieg-7aa.png" alt="Tabelle2" />
                            </figure>
                        </div>
                    <div className="p-4">
                        <InfoCard
                            text={"Wenn Sie in eines der rechteckigen Elemente klicken, erscheint rechts oben über dem Element ein kleines x zum Löschen des Elements." +
                                "Das Dreieck neben einem Element zeigt die Tabelle. Wurde in dem Element eine Funktion angewandt, zeigt das Dreieck die Tabelle nach Ausführung der Funktion an. In unserem Fall zum Beispiel das Joinen der beiden Tabellen."}
                        />
                    </div>

                    <div className="p-5">
                    Schritt 1:
                    </div>
                    Wir starten mit der Bearbeitung, indem wir mit der Funktion "Daten verknüpfen" die beiden Tabellen über die Spalte "Stadtviertel" miteinander verschneiden. Dies bedeutet, dass wir den Zeilen in Tabelle 1 die Werte zuordnen, die in Tabelle 2 das gleiche Stadtviertel haben.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-7b.png" alt="Join" />
                        </figure>
                    </div>
                        <div className="p-4">
                            <InfoCard
                                text={"Bitte beachten Sie: Die Werte in den beiden Spalten müssen jeweils gleich geschrieben werden. Werte wie Str. und Straße werden nicht als gleich definiert."}/>
                        </div>
                    Um die gewünschte Information zu erhalten, müssen wir die gejointe Tabelle nach der Summe der Anzahl der Bürger auswerten, gruppiert nach Alter und Sozialräumen, und darstellen.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[45vh] object-contain" src="wikiAssets/metabase/Einstieg-7c.png" alt="Join" />
                            </figure>
                        </div>

                    <div className="p-5">
                        Schritt 2:
                    </div>
                    Nachdem Sie das Modell gespeichert haben, können Sie die Daten visualisieren. Für diese Information eignet sich eine Flächendarstellung, da sich hier die Altersverteilung gut über eine Linie anzeigen lässt, die an die Baumstruktur bei der Ansicht von demografischen Verteilungen erinnert. Außerdem lassen sich die Flächen übereinander legen, sodass die unterschiedlichen Sozialräume gleichzeitig vergleichbar sind.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-7d.png" alt="Join" />
                        </figure>
                    </div>
                </section>
            </section>
        </div>
    );
};