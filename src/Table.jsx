const headers = ["Name", "Title", "Email", "Role"]
  
  export default function Table(props) {
    return (
      <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                        {props.header.map((header) => (
                            <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                {header}
                            </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.data.map((person, index) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{index}</td>
                        <td className="whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{person.name} </td>
                        <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{person.title}</td>
                        <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-500">{person.role}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        </td>
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
  