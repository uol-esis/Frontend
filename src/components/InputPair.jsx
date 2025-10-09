

export default function InputPair({ name1, name2, customKey, buildMap, isEditing, values, setValues }){
  return(
  <div className="flex flex-col gap-2">
    <p className="text-sm">{name1}</p>
    <input
      type="text"
      required={true}
      value={customKey}
      onChange={e => buildMap(e.target.value, true)}
      disabled={!isEditing}
      className={`shadow rounded px-2 py-1 text-sm ${
        !isEditing
          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
          : "bg-white"
      }`}
    />
    <p className="text-sm">{name2}</p>
    <input
      type="text"
      required={true}
      value={values}
      onChange={e =>
        setValues(e.target.value.split(",").map(item => item.toString()))
      }
      disabled={!isEditing}
      className={`shadow rounded px-2 py-1 text-sm ${
        !isEditing
          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
          : "bg-white"
      }`}
    />
  </div>
  );
}