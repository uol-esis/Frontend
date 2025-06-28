export default function ErrorDialog({ dialogRef, text, onConfirm, errorMsg }) {
    return (
        <dialog className=" justify-self-center p-5 mt-[20vh] w-[30vw] shadow-md bg-white " ref={dialogRef}>
            <div className="flex flex-col place-items-center p-5 gap-5 bg-white">
                <img className="h-[15vh] w-[15vw] object-contain" src="error.jpg" alt="Upload fehlgeschlagen" />
                <p className="text-base font-semibold">{text}</p>
                <p>{errorMsg}</p>
            </div>
            <button
                className=" p-5 mt-3 w-[15vw] rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onConfirm}
            >
                Ok
            </button>
        </dialog>
    );
}