"use client"
import combineClasses from '@/helpers/combineClasses'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BanknotesIcon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import Tabs from './Tabs'

const tabs = [
  { name: 'Ongoing', href: '#', count: '2', current: false },
  { name: 'Completed', href: '#', count: '4', current: true },
]
const candidates = [
  {
    name: 'Rolex',
    email: 'Green mint with diamonds',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: 'January 7, 2020',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
  },
  // More candidates...
]

export default function Completed() {

  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900">Bid Items</h2>
          <Tabs/>
        </div>

        {/* Stacked list */}
        <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
          {candidates.map((candidate) => (
            <li key={candidate.email}>
              <Link href="/item/1" className="group block hover:bg-gray-50">
                <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 pl-1 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-purple-600">{candidate.name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="truncate">{candidate.email}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm flex items-center text-gray-900">
                            <BanknotesIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                              aria-hidden="true"
                            />
                            Closed for $450.00
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <ClockIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                              aria-hidden="true"
                            />
                            Ended 2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <nav
          className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
          aria-label="Pagination"
        >
          <div className="-mt-px flex w-0 flex-1">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </a>
          </div>
          <div className="hidden md:-mt-px md:flex">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              1
            </a>
            {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
              aria-current="page"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              3
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              4
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              5
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              6
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </main>
  )
}
