export function StackedList({headerTextArray}){

    return(
          <ul role="list" className="bg-white w-[25vw] divide-y divide-gray-200 border-2 border-solid border-gray-200 rounded-r-md ">
          {headerTextArray.map((item) => (
              <li key={item.header} className="p-4 ">
              <div className="flex items-center gap-x-3">
                  <h3 className="flex-auto truncate  text-sm/6 font-semibold text-gray-900">{item.header}</h3>
              </div>
              <p className="mt-1 wrap-break-word text-sm">
                  <span className="font-medium text-gray-500">{item.text}</span> 
              </p>
              </li>
          ))}
          </ul>
    );
}