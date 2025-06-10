import { useState, useEffect } from "react";

export default function Tooltip({
    tooltipContent,
    showTutorial,
    direction,
    onClick,
    showButton = true,
    openPopup,
    closePopup
}){

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(showTutorial);
        }, [showTutorial]);


    return(
        <div className="h-full">
            {showTutorial &&
            <div  className= " p-3 rounded-lg bg-gray-800 text-white text-wrap  "
                onMouseEnter={openPopup}
                onMouseLeave={closePopup}
            > 

                <p className="">{tooltipContent}</p>

                {showButton &&
                    <button
                        type="button"
                        className="mt-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onClick}
                        >
                        Ok
                    </button>
                }    

                {/* arrows */}
                { direction === "top" && 
                <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-[8px] border-l-transparent 
                border-r-[8px] border-r-transparent 
                border-b-[8px] border-b-gray-800">
                </div>}

                { direction === "left" && 
                <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                border-t-[8px] border-t-transparent 
                border-b-[8px] border-b-transparent 
                border-r-[8px] border-r-gray-800">
                </div>}

                {direction === "right" &&
                <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                border-t-[8px] border-t-transparent 
                border-b-[8px] border-b-transparent 
                border-l-[8px] border-l-gray-800">
                </div>}

                {direction == "bottom" &&
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-[8px] border-l-transparent 
                border-r-[8px] border-r-transparent 
                border-t-[8px] border-t-gray-800">
                </div>}
            </div>
            }
        </div>
    );
}
