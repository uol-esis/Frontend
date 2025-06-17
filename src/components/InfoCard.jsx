import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function InfoCard({text}) {
  return (
    <div className="rounded-md bg-gray-100 p-4">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon aria-hidden="true" className="size-5 text-gray-400" />
        </div>
        <div className="flex-1 md:flex md:justify-between">
          <p className="whitespace-pre-line text-gray-900 text-left ml-4"> {text}</p>
        </div>
      </div>
    </div>
  )
}
