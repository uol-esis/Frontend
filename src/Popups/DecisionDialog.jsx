import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function DecisionDialog({dialogRef, text,label1, function1, label2, function2}){

    return(
        <dialog  className=" justify-self-center mt-[20vh] w-[30vw] shadow-md bg-white " ref={dialogRef}>
            <div className="flex flex-col place-items-center p-5 gap-5 bg-white">
                <InformationCircleIcon aria-hidden="true" className="size-20 text-gray-400" />
                <p>{text}</p>
                <button
                    className=" p-5 w-[15vw] rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={function1}
                >
                    {label1}
                </button>

                <button
                    className=" p-5 w-[15vw] rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={function2}
                >
                    {label2}
                </button>
                
            </div>
            
        </dialog>
    );
}