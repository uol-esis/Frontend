import { useState, useEffect } from 'react';

const BrowserWarning = () => {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;

        const isFirefox = userAgent.includes('Firefox');
        const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR') && !userAgent.includes('Opera');
        const isEdge = userAgent.includes('Edg');
        const isOpera = userAgent.includes('OPR') || userAgent.includes('Opera');

        if(!isFirefox && !isChrome) {
            setShowWarning(true);
        }

        if(isEdge || isOpera) {
            setShowWarning(true);
        }
    }, []);

    if (!showWarning) return null;


    return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black font-semibold text-center p-3 shadow-md flex justify-center items-center">
        <span>
            Note: You are using a browser that has not been tested with Th1nk. This may cause problems. We recommend using <a href="https://www.mozilla.org/firefox/new/" className="underline font-bold">Firefox</a> or <a href="https://www.google.com/chrome/" className="underline font-bold">Chrome</a>.
        </span>
        <button
            onClick={() => setShowWarning(false)}
            className="ml-4 px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition">
                Okay
        </button>
    </div>
    );
};

export default BrowserWarning;