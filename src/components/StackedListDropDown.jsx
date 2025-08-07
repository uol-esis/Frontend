import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'


export function StackedListDropDown({title , headerTextArray, isImportant}){

    const [showAll, setShowAll] = useState(false);
    
    return(
          <div>
            {/* header */}
            <div className={`flex justify-between p-1 w-[15vw] text-md/6 font-semibold bg-white text-gray-900 ${showAll ? "" : "border-b-2" } border-t-2 border-l-2 border-r-2 border-solid border-gray-200 rounded-t-md`}>
                <p className="">
                    {title}
                </p>
                <button
                    onClick={() => {setShowAll(!showAll)}}
                >
                    <div className="flex">
                        
                        {isImportant ?
                            <ExclamationTriangleIcon aria-hidden="true" className="size-7 text-yellow-400" />
                            : null
                        }
                        {showAll ?  
                            <ChevronUpIcon className="size-5 mt-1 text-gray-600 hover:text-indigo-500"/>  
                            : <ChevronDownIcon className="size-5 mt-1 text-gray-600 hover:text-indigo-500"/> 
                        }
                    </div>
                </button>
            </div>
            {/* content */}
            {showAll ? 
                <ul role="list" className="bg-white w-[25vw]  border-2 border-solid border-gray-200 rounded-r-md ">
                    {headerTextArray.length == 0 ? <li>Keine Einträge vorhanden</li> : null}
                    {headerTextArray.map((item, index) => (
                        <li key={item.header + item.text} className={` ${item.header ? "p-3 mt-3 " : "p-1 ml-3" } ${index != 0 && item.header ? " border-t-2 border-gray-200 ": ""} `}>
                        <div className={`flex items-center  `}>
                            <h3 className="flex-auto truncate  text-sm/6 font-semibold text-gray-900">{item.header}</h3>
                        </div>
                        <p className={`wrap-break-word text-sm  ${item.header ? "" : "divide-y divide-gray-200" }`}>
                            <span className={`font-medium text-gray-500 `}>{item.text}</span>
                        </p>
                        </li>
                    ))}
                </ul> : null
            }
          </div>
    );
}
