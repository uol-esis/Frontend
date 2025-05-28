import { div } from "framer-motion/client";
import { useRef } from "react";
import Sidebar from "./Sidebar";

export default function Wiki() {

    //TODO current ist unnötig
    const chapter1ref = useRef();
    const navigation = [
        {name: 'Dashboard', href: chapter1ref, current: true }
    ]

    

    const scrollTo = (ref) => { 
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return(
        <div className="flex h-full ">
            <div className="h-screen w-[15vw] fixed">
                <Sidebar onClick={scrollTo} navigation={navigation}/>
            </div>
            
            <div className="flex flex-col ml-[15vw] p-4">
                <p>Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                    Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                    Können Kryptowährungen also mehr sein als nur reine Spekulation?
                    </p>
                    <section ref={chapter1ref} className="mt-10">
                        <span>
                            <h2 className="text font-semibold" >Neues Thema</h2>
                        </span>
                        
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?Im Keller eines Augsburger Gewerbegebiets liegt eine Bitcoin-Mine. 
                        Der Besitzer nutzt die Abwärme der Rechner direkt für die Produktionsräume seiner Firma im Erdgeschoss. 
                        Können Kryptowährungen also mehr sein als nur reine Spekulation?
                        
                    </section>
                    
                    
                    
                    
                     
            </div>
        </div>
    );
}