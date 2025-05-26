import CheckBox from "/src/CheckBox";

export default function CheckboxDialog({ dialogRef, allCheck, setAllCheck, onConfirm }) {
    return (
      <dialog ref={dialogRef} className="self-center justify-self-end shadow-md bg-gray-100">
        <div>
          <CheckBox setAllCheck={setAllCheck} />
          <button
            type="button"
            className="p-5 m-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={() => dialogRef.current?.close()}
          >
            Zurück
          </button>
          <button
            type="button"
            className={`mt-4 flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${
              allCheck ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!allCheck}
            onClick={onConfirm}
          >
            Hochladen
          </button>
        </div>
      </dialog>
    );
  }
  