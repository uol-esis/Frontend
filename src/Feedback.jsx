import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feedback(){

    const [inputText, setInpuText] = useState("");
    const [category, setCategory] = useState("landingpage");
    const navigate = useNavigate();

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        //fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        formJson.category = category;

        console.log(formJson);
    }

    return(
        <div className='flex items-center justify-center mt-4'>
            <div className='w-1/2 flex flex-col items-center gap-4'>
                <p className='text-lg font-semibold'>Feedback</p>
                <p>Hier gibt es die Möglichkeit uns zu den jewiligen Features des Tools Feedback zu geben oder Fehler zu melden</p>
                {/* Choose category */}
                <div className='p-4 self-start'>
                    <label htmlFor="location" className="text-left block text-sm/6 font-medium text-gray-900">
                        Kategorie
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="location"
                            name="location"
                            onChange={(choice) => {setCategory(choice.target.value)}}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value={"landingpage"}>Startseite</option>
                            <option value={"upload"}>Uploadseite</option>
                            <option value={"preview"}>Previewseite</option>
                            <option value={"edit schema"}>Schema bearbeiten</option>
                            <option value={"bugs"}>Fehler</option>
                            <option value={"other"}>Sonstiges</option>
                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </div>
                </div>
                
                <form className="w-full p-4" method="post" onSubmit={handleSubmit}>
                {/* Text input */}
                
                <label htmlFor="comment" className="text-left block text-sm/6 font-medium text-gray-900">
                    Feedback
                </label>
                <div className="mt-2">
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        defaultValue={''}
                    />
                </div>
                
                {/* Buttons */}
                <div className='flex justify-between'>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="p-4 m-4 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Zurück
                    </button>
                     <button
                        type="submit"
                        className="p-4 m-4 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Senden
                    </button>
                </div>
                </form>
            </div>
        </div>
        

    );
}