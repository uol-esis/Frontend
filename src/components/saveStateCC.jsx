import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function SaveStatus({ state }) {
    if (state === "saved") {
        return(
            <div className="flex items-center gap-1 text-green-600" >
                <CheckCircleIcon className="h-5 w-5"/>
                <span className="text-sm">Gespeichert</span>
            </div>
        );
    }


    if(state ==="error") {
        return(
            <div className="flex items-center gap-1 text-red-600" >
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span className="text-sm">Fehler beim Speichern</span>
            </div>
        );
    }
    
    return (
        <div className="flex items-center gap1 text-gray-500" >
            <span className="text-sm">Nicht gespeichert</span>
        </div>
    )
}