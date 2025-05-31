import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";

export default function Wiki() {

    const chapter1ref = useRef();
    const converterRef = useRef();
    const removeColumnRef = useRef();

    const navigation = [
        {name: 'Einleitung', href: chapter1ref, current: true },
        {name: 'Converter', href: 'converterRef', children: [
           { name: 'Spalte entfernen', href:'#' },
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
                    <p> Wotk in Progress</p>
                </section>

                <section ref={chapter1ref} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Converter</h2>
                    <p> 
                        Converter werden in der Ansicht "Tabellentransformation bearbeiten" verwendent.
                        Ein Converter entspricht einem Bearbeitungsschritt, der auf die Tabelle angwendet wird. 
                        Damit dieser Bearbeitungsschritt korrekt durchgeführt wird braucht jeder Converter verschiedene Informationen, beispielsweise
                        Start- und Endreihe. Im folgenden werden alle Converter aufgelistet und deren Funktionweise genauer erklärt.

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