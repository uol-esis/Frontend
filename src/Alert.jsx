import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Alert(props) {
  return (
    <div className={`rounded-md ${props.color} p-4 mt-[2vh] rounded-[10px] pl-[2vh] mx-[5vw]`}>
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between items-left text-left">
          <p className="text-sm "> {props.text} </p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">
          </p>
        </div>
      </div>
    </div>
  )
}