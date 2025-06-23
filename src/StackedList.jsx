import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";


export function StackedList({title , headerTextArray}){

    const [showAll, setShowAll] = useState(false);

    return(

          <div>
            
            <div className={`flex justify-between p-1 w-[15vw] text-md/6 font-semibold bg-white text-gray-900 ${showAll ? "" : "border-b-2" } border-t-2 border-l-2 border-r-2 border-solid border-gray-200 rounded-t-md`}>
                <p className="">
                    {title}
                </p>
                <button
                    onClick={() => {setShowAll(!showAll)}}
                >
                    {showAll ?  
                        <ChevronUpIcon className="size-5 mt-1 text-gray-600 hover:text-indigo-500"/>  
                        : <ChevronDownIcon className="size-5 mt-1 text-gray-600 hover:text-indigo-500"/> 
                    }
                   
                </button>
                
            </div>
            {showAll ? 
                <ul role="list" className="bg-white w-[25vw] divide-y divide-gray-200 border-2 border-solid border-gray-200 rounded-r-md ">
                    {headerTextArray.map((item) => (
                        <li key={item.header} className="p-4 ">
                        <div className="flex items-center gap-x-3">
                            <h3 className="flex-auto truncate  text-sm/6 font-semibold text-gray-900">{item.header}</h3>
                        </div>
                        <p className="mt-1 wrap-break-word text-sm">
                            <span className="font-medium text-gray-500">{item.text}</span>
                        </p>
                        </li>
                    ))}
                </ul> : null
            }
            
          </div>

    );
}