import { useState, useEffect } from "react";
import InputPair from "./InputPair";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function MapInputField({name1, name2, handleInputChange, isEditing, param}){

    const [valuesArr, setValuesArr] = useState([""]);
    const [keys, setKeys] = useState([""]);
    const [items, setItems] = useState([{ name1: "Neuer Spaltenname", name2: "Spaltennummern"}]);

  
    useEffect(() => {
        let map = {};
        for (let i = 0; i < keys.length; i++) {
            map[keys[i]] = valuesArr[i];
        }
        handleInputChange(param.apiName, map);
    },[keys, valuesArr])

    const addNewMapEntry = () => {
        const item = { name1: "Neuer Spaltenname", name2: "Spaltennummern"};
        const newItems = [...items, item];
        setItems(newItems);
    }

    const setKeysAtIndex = (value, index) => {
        console.log("set key");
       const newKeys = [...keys];
        newKeys[index] = value;
        setKeys(newKeys);
    }

    const setValuesAtIndex = (valArr, index) => {
        const newValues = [...valuesArr];
        newValues[index] = valArr;
        setValuesArr(newValues);
    };

    const removeAtIndex = (indexToRemove) => {
        //remove key
        const newKeys = keys.filter((_, index) => index !== indexToRemove);
        setKeys(newKeys);

        //remove value
        const newValues = valuesArr.filter((_, index) => index !== indexToRemove);
        setValuesArr(newValues);

        //remove items
        const newItems = items.filter((_, index) => index !== indexToRemove);
        setItems(newItems);
    }

    return(
    
        
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                <div className="flex justify-center">
                    <InputPair
                        key={index}
                        name1={item.name1}
                        name2={item.name2}
                        param={item.param}
                        customKey={keys[index]}
                        buildMap={(val) => setKeysAtIndex(val, index)}
                        isEditing={isEditing}
                        values={valuesArr[index]}
                        setValues={valArr => setValuesAtIndex(valArr, index)}
                    />
                    <XMarkIcon className="h-4 w-4 mt-2 ml-2 shrink hover:text-indigo-600" onClick={() => {removeAtIndex(index)}} />
                    </div>
                ))}
                <button
                    type="button"
                    className="h-8 w-8 hover:text-indigo-600 self-center"
                    disabled={!isEditing}
                    onClick={addNewMapEntry}
                >
                    <PlusCircleIcon/>
                </button>
            </div>
            
        
    );
}