import { useState, useEffect } from "react";

export default function MapInputField({name1, name2, handleInputChange, isEditing, param}){

    const [customKey, setKey] = useState("");
    const [values, setValues] = useState([]);

    useEffect(() => {
        const map = {
            [customKey]: values
        };
        handleInputChange(param.apiName, map);
    },[customKey, values])

    const buildMap = (value, isKey) => {
        if(isKey){
             setKey(value);
        }else{
            setValues(value);
        }
    }

    return(
        //formData[param.apiName] || 
        <div>
            <p className="text-sm">{name1}</p>
            <input
                type={"text"}
                required={param.required}
                value={customKey}
                onChange={e => buildMap( e.target.value, true)}
                disabled={!isEditing}
                className={`shadow rounded px-2 py-1 text-sm ${!isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}}`}
            />
            <p className="text-sm">{name2}</p>
            <input
                type={"text"}
                required={param.required}
                value={values}
                onChange={e => setValues(e.target.value.split(',').map(item => item.toString()) )}
                disabled={!isEditing}
                className={`shadow rounded px-2 py-1 text-sm ${!isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}`}
            />
        </div>
    );
}