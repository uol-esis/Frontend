import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function SelectionMenu({label, optionNames, optionValues, selectedValue, setCategory, index, apiName, isEditing}){

const getOptionNameByValue = (value) => {
  const index = optionValues.findIndex(
    (optionValue) => optionValue === value
  );
  if (index !== -1) {
    return optionNames[index];
  }
  return "";
};

return (
  <>
    <div className="grid grid-cols-1">
      <select
        id="location"
        name="location"
        value={selectedValue || ""}
        onChange={(choice) =>
          setCategory(index, choice.target.value, apiName)
        }
        className={`col-start-1 row-start-1 w-full appearance-none shadow rounded px-2 py-1 text-sm ${
          !isEditing
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-white"
        }`}
        disabled={!isEditing}
      >
        <option value={""}>Auswahl treffen...</option>
        {optionValues.map((value, i) => (
          <option key={i} value={value}>
            {optionNames[i]}
          </option>
        ))}
      </select>

      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
      />
    </div>
  </>
);

}