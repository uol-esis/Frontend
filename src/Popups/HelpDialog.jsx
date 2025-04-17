import NewPopup from "/src/NewPopup.jsx";

export default function HelpDialog({ dialogRef }) {
    return (
      <dialog ref={dialogRef} className="self-center justify-self-center bg-gray-100">
        <div>
          <NewPopup />
          <button
            type="button"
            className="p-5 m-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </div>
      </dialog>
    );
  }
  