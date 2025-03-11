
export default function Table(props) {
  const headers = props.data[0] || []; // First row as headers
  const rows = props.data.slice(1); // Remaining rows as data


  return (
    <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Index</th>
                    {headers.map((header, index) => (
                      <th key={index} scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{i}</td>
                      {row.map((cell, j) => (
                        <td key={j} className="whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{cell} </td>
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
  )
}
