export default function Table(props) {
  const headers = props.data[0] || []; // First row as headers
  const rows = props.data.slice(1); // Remaining rows as data

  // Add column indices as the first row
  const columnIndices = ["Index", ...headers.map((_, index) => index)];

  return (
    <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="">
                  <tr>
                    {columnIndices.map((colIndex, index) => (
                      <th key={index} scope="col" className={`py-2 pl-4 pr-3 text-center text-sm font-semibold text-gray-500 bg-white sm:pl-6 ${
                        index === 0 ? "border-r border-gray-300" : ""
                      }`}
                      >
                      {colIndex}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Header row */}
                  {/* Highlight the header row */}
                  <tr className="bg-gray-100">
                    <td className="whitespace-nowrap px-3 py-1.5 text-sm bg-white text-gray-500">0</td>
                    {headers.map((header, index) => (
                      <td key={index} className={`whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 ${
                        index === 0 ? "border-l border-gray-300" : ""
                      }`}>
                        {header}
                      </td>
                    ))}
                  </tr>
                  {/* Data rows */}
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{i + 1}</td>
                      {row.map((cell, j) => (
                        <td key={j} className={`whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ${
                          j === 0 ? "border-l border-gray-300" : ""
                        }`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}