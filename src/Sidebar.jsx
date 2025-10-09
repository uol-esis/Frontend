import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

/*
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  {
    name: 'Teams',
    current: false,
    children: [
      { name: 'Engineering', href: '#' },
      { name: 'Human Resources', href: '#' },
      { name: 'Customer Success', href: '#' },
    ],
  },
  {
    name: 'Projects',
    current: false,
    children: [
      { name: 'GraphQL API', href: '#' },
      { name: 'iOS App', href: '#' },
      { name: 'Android App', href: '#' },
      { name: 'New Customer Portal', href: '#' },
    ],
  },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
  */

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({onClick, navigation}) {
  return (
    <div className="flex overflow-y-auto h-full border-r border-gray-200 bg-white shadow p-2 ">
      
      <nav className="flex flex-col ">
       
          
            <ul role="list" className="">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <button
                      onClick={() => {onClick(item.href)}}
                      
                      className={classNames(
                        item.current ? 'bg-gray-100 w-full text-left ' : 'text-left w-full hover:bg-gray-100',
                        'block rounded-md py-2 text-sm/6 font-semibold text-gray-700',
                      )}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Disclosure as="div">
                      <DisclosureButton
                        className={classNames(
                          item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                          'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700',
                        )}
                      >
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                        />
                        {item.name}
                      </DisclosureButton>
                      <DisclosurePanel as="ul" className="mt-1 px-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            <div className='group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700'>
                              <ChevronRightIcon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                              />
                              <button
                                as="a"
                                onClick={() => {onClick(subItem.href)}}
                                className={classNames(
                                  subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                  'block rounded-md w-full text-left text-sm/6 text-gray-700',
                                )}
                              >
                                {subItem.name}
                              </button>
                            </div>
                          </li>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          
              {/* items at the end of the sidebar */}
        
      </nav>
    </div>
  )
}
