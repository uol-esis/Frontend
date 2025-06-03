import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import InfoCard from "./components/InfoCard";

export default function Wiki() {

    const introductionRef = useRef();
    const converterRef = useRef();
    const addColNameRef = useRef();
    const removeFooterRef = useRef();
    const removeHeaderRef = useRef();
    const replaceEntriesRef = useRef();
    const splitRowRef = useRef();
    const removeInvalidRowsRef = useRef();
    const removeTrailingColRef = useRef();

    const navigation = [
        {name: 'Einleitung', href: introductionRef },
        {name: 'Converter', href: converterRef, children: [
           { name: 'Spalte entfernen', href:'#' },
           { name: 'Spalteüberschriften hinzufügen', href: addColNameRef },
           { name: 'Fußzeile entfernen', href: removeFooterRef },
           { name: 'Kopfzeile entfernen', href: removeHeaderRef },
           { name: 'Einträge ersetzen', href: replaceEntriesRef },
           { name: 'Zeile aufteilen', href: splitRowRef },
           { name: 'Ungültige Zeilen entfernen', href: removeInvalidRowsRef },
           { name: 'Nachträglich Spalten entfernen', href: removeTrailingColRef },
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
            <div className="flex flex-col ml-[15vw] p-5 mb-5">

                {/* Introduction */}
                <section ref={introductionRef}>
                    <h2 className="text font-semibold text-lg"> Einleitung </h2>
                    <p> Work in Progress</p>
                </section>

                {/* Converter */}
                <section ref={converterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Converter</h2>
                    <p> 
                        Converter werden in der Ansicht "Tabellentransformation bearbeiten" verwendent.
                        Ein Converter entspricht einem Bearbeitungsschritt, der auf die Tabelle angwendet wird. 
                        Damit dieser Bearbeitungsschritt korrekt durchgeführt wird braucht jeder Converter verschiedene Informationen, beispielsweise
                        Start- und Endreihe. Im folgenden werden alle Converter aufgelistet und deren Funktionweise genauer erklärt.

                    </p> 
                </section>

                {/* remove grouped header */}
                <section ref={addColNameRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Gruppenüberschrift entfernen</h2>
                    <p> 
                        Mithilfe dieses Converters können Verschachtelungen in der Kopfzeile und in Spalten aufgelöst werden. 
                        Dabei müssen die Zeilen und Spalten angegeben werden, wo die Verschachtelungen auftreten. Außerdem muss vorher
                        der Converter "Leere Zeilen auffüllen" angewendet werden,damit keine leeren Einträge in den Verschachtelungen auftreten.
                        
                        
                    </p> 
                    <div className="p-4">
                        <InfoCard 
                            text={
                            "- Wenn in den Spalten keine Verschachtelungen auftreten, dann kann beim Spaltenindex 0 eingetragen werden \n" +
                            "- Am Ende müssen die Spaltennamen mit dem Converter \"Spalten überschriften hinzufügen\" angepasst werden"
                        }/>
                    </div>
                    
                    <p className="text-left font-semibold mt-4">Beispiel: "Undefined" zu "Anzahl" ändern</p>
        	        <p className="text-left">
                        Da die letzte Spalte undefined ist, also kein Name vergeben wurde taucht dieser nicht in der Auflsitung auf.
                        Also kann der neue Spaltenname "Anzahl" am Ende der Aufzählung hinzugefügt werden.    
                    </p>

                    <div className="flex justify-center">
                        <img className="mt-5 object-contain" src="public/wiki/addHeaderNameParameter.png" alt="" />
                    </div>
                    
                    <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Vorher </figcaption>
                                <img className=" object-contain w-[35vw]" src="public/wiki/addHeaderNameStandard.png" alt="" />
                                
                            </figure>
                            
                            <figure>
                                <figcaption className="font-semibold p-4"> Nachher</figcaption>
                                <img className="object-contain w-[35vw]" src="public/wiki/addHeaderNameNew.png" alt="" />
                                
                            </figure>
                            
                    </div>
                    
                   
                </section>

                    
                

                {/* add column name */}
                <section ref={addColNameRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Spaltenüberschriften hinzufügen</h2>
                    <p> 
                        Mithilfe dieses Converters können die Spaltennamen verändert werden. 
                        Die Namen werden durch ein Komma getrennt und der erste Name wird auf die erste Spalte angwendet,
                         der zweite Name auf die zweite Spalte undsoweiter.
                        
                    </p> 
                    <div className="p-4">
                        <InfoCard 
                            text={
                            "- Die Aufzählung der Spaltennamen ohne Leerzeichen schreiben, denn diese werden als Unterstrich angezeigt\n- undefined bedeutet, das für die Spalte kein Name vergeben wurde" 
                        }/>
                    </div>
                    
                    <p className="text-left font-semibold mt-4">Beispiel: "Undefined" zu "Anzahl" ändern</p>
        	        <p className="text-left">
                        Da die letzte Spalte undefined ist, also kein Name vergeben wurde taucht dieser nicht in der Auflistung auf.
                        Also kann der neue Spaltenname "Anzahl" am Ende der Aufzählung hinzugefügt werden.    
                    </p>

                    <div className="flex justify-center">
                        <img className="mt-5 object-contain" src="public/wiki/addHeaderNameParameter.png" alt="" />
                    </div>
                    
                    <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Vorher </figcaption>
                                <img className=" object-contain w-[35vw]" src="public/wiki/addHeaderNameStandard.png" alt="" />
                                
                            </figure>
                            
                            <figure>
                                <figcaption className="font-semibold p-4"> Nachher</figcaption>
                                <img className="object-contain w-[35vw]" src="public/wiki/addHeaderNameNew.png" alt="" />
                                
                            </figure>
                            
                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove footer */}
                <section ref={removeFooterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Fußzeile entfernen</h2>
                    <p> 
                        Mit diesem Converter wird der Abschnitt unter den eigentlichen Daten entfernt. 
                        Dies dient dazu die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können. 
                        Für die korrekte Verarbeitung der Daten wird nur die Tabelle benötigt. Andernfalls werden die Textzeilen als Daten angesehen
                        und in die Tabelle geschrieben.
                        
                    </p> 
                    <div className="p-4">
                        <InfoCard 
                            text={
                            "Dieser Converter funktioniert automatisch und es müssen keine weiteren Angaben gemacht werden" 
                        }/>
                    </div>
                    
                    <p className="text-left font-semibold mt-4">Beispiel:</p>
        	        <p className="text-left">Bei dieser Tabelle wird der Text unter der Tabelle entfernt, also Zeile 80 und 81</p>
                    <img className="mt-5 object-contain" src="public/wiki/removeFooter.png" alt="Kopfzeile entfernen Bild" />
                   
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
                        }/>
                    </div>
                    
                    <p className="text-left font-semibold mt-4">Beispiel:</p>
        	        <p className="text-left">Bei dieser Tabelle werden der Text über der Tabelle, also Zeile 3 bis 7</p>
                    <img className="mt-5 object-contain" src="public/wiki/removeHeader.png" alt="Kopfzeile entfernen Bild" />
                   
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* replace entries */}
                <section ref={replaceEntriesRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Einträge ersetzen </h2>
                    <p> 
                        Dieser Converter kann einzelne Einträge in der Tabelle ersetzen, um beispilsweise fehlerhafte Einträge zu korrigieren.
                        Dabei wird die gesamte Tabelle nach dem Suchbegriff durchsucht und anschließend durch den "Ersetzen durch" - Wert ersetzt.
                    </p> 

                    <div className="p-4">
                        <InfoCard
                            text={"Wenn der Suchbegriff mehrfach vorkommt, so werden alle Vorkommen durch den neuen Wert ersetzt"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Beispiel: "Stadtviertel" durch "Stadtteil" ersetzt</p>
        	        
                    <div className="flex justify-center">
                        <img className="mt-5 object-contain" src="public/wiki/replaceEntriesParameter.png" alt="" />
                    </div>
                    
                    <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Vorher </figcaption>
                                <img className=" object-contain" src="public/wiki/standardTable.png" alt="remove Column" />
                                
                            </figure>
                            
                            <figure>
                                <figcaption className="font-semibold p-4"> Nachher</figcaption>
                                <img className="object-contain" src="public/wiki/replaceEntriesTable.png" alt="remove Column" />
                                
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
                        diese sollen in seperate Zeilen angegeben werden. 
                        Dafür muss der Index der entsprechenden Spalte angegeben werden. 
                    </p>
        	        
                    <div className="flex justify-center">
                        <img className="mt-5 object-contain" src="public/wiki/splitRowParameter.png" alt="" />
                    </div>
                    
                    <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Vorher </figcaption>
                                <img className=" object-contain" src="public/wiki/splitRowStandard.png" alt="remove Column" />
                                
                            </figure>
                            
                            <figure>
                                <figcaption className="font-semibold p-4"> Nachher</figcaption>
                                <img className="object-contain" src="public/wiki/splitRowNew.png" alt="remove Column" />
                                
                            </figure>
                            
                    </div>
                    
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove invalid rows */}
                <section ref={removeInvalidRowsRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Ungültige Zeilen entfernen </h2>
                    <p> 
                        Dieser Converter entfernt ungültige Zeilen. Im Standardfall wird eine Zeile als ungültig angesehen, sobald sich minedstens
                        eine leere Zelle in dieser Zeile befindet. Dies kann dazu verwendet werden, 
                        um nur vollständige Zeilen für die Visualisierung zu verwenden. 
                        Threshold gibt an wie viele Einträge in einer Zeile gefüllt sein müssen, damit sie nicht gelöscht wird.
                        
                    </p> 

                    <div className="p-4">
                        <InfoCard
                            text={"- Der Threshold gibt an wie viele Einträge in einer Zeile korrekt gefüllt sein müssen, damit sie nicht gelöscht wird. \n "+
                                " - Komplett leere Zeilen werden immer gelöscht"}
                        />
                    </div>

                   

                    <p className="text-left font-semibold mt-4">Beispiel:</p>
                     <p className="text-left">
                        Wird der Threshold auf 1 gesetzt, so werden alle Zeilen mit mehr als einer korrekt befüllten Zelle behalten.
                        Dadurch wird die Zeile mit dem Eintrag "m" gelöscht , weil die Anzahl der korrekten Einträge
                        kleiner gleich dem Threshold ist. Die komplett leere Zeile wird immer gelöscht.
                    </p>
        	        
                    <div className="flex justify-center">
                        <img className="mt-5 object-contain" src="public/wiki/removeInvalidRowParameter.png" alt="" />
                    </div>
                    
                    <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Vorher </figcaption>
                                <img className=" object-contain" src="public/wiki/removeInvalidRowStandard.png" alt="remove Column" />
                                
                            </figure>
                            
                            <figure>
                                <figcaption className="font-semibold p-4"> Nachher</figcaption>
                                <img className="object-contain" src="public/wiki/removeInvalidRowNew.png" alt="remove Column" />
                                
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