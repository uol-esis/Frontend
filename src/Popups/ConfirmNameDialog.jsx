import { useState, useEffect } from "react";
export default function ConfirmNameDialog({dialogRef, name, onClickFunction, errorText}){
    const [error, setError] = useState(errorText)
    const [text, setText] = useState(name);

    useEffect(() => {
        setText(name);
    }, [name]);

    useEffect(() => {
        setError(errorText);
    }, [errorText]);

    return(
        <dialog  className="justify-self-center mt-[20vh] w-[50vw] shadow-md bg-white " ref={dialogRef}>
            <div className="flex flex-col justify-between h-full p-5 bg-white">
                <p className="text font-semibold ">Confirm or edit table transformation name</p>
                {/* Text input */} 
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-red-800 bg-red-200">{error}</p>
                    <label htmlFor="username" className=" text-left block text-sm/6 font-medium text-gray-900">
                        Generated table transformation name:
                    </label>
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <input
                            id="username"
                            name="dataName"
                            type="text"
                            value={text}
                            onChange={(evt) => { setText(evt.target.value); }}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                        </div>
                </div>
                {/* Buttons */}
                <div className="flex mt-2 justify-between">
                    <button
                        className=" p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {dialogRef.current?.close()}}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            onClickFunction(text);
                        }}
                        className=" p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            
        </dialog>
    );
}