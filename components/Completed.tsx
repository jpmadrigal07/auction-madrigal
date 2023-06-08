"use client"
import {
  ArrowPathIcon,
  BanknotesIcon,
  ClockIcon,
} from '@heroicons/react/20/solid'
import Tabs from './Tabs'
import { T_FULL_ITEM } from '@/types/global'
import moment from 'moment'
import toast from 'react-hot-toast';
import TableSkeleton from './TableSkeleton'
import toCurrency from '@/helpers/toCurrency'
import Link from 'next/link'
import useGetItems from '@/hooks/useGetItems'
import useGetItemsCount from '@/hooks/useGetItemsCount'

export default function Completed() {
  const { data: items, isLoading: isItemsLoading } = useGetItems('completed');
  const { data: itemsCount, isLoading: isItemsCountLoading } = useGetItemsCount();
  if (typeof items === 'string') {
    toast.error(items);
  }
  if (typeof itemsCount === 'string') {
    toast.error(items);
  }
  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex items-center">
            <h2 className="flex-1 text-lg font-medium text-gray-900">Bid Items</h2>
            <Link href="/home/completed" prefetch={false} className="flex-none flex gap-1 items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 disabled:opacity-90 disabled:cursor-progress">
              <ArrowPathIcon className="h-5 w-5" />
              Refresh
            </Link>
          </div>
          {!isItemsCountLoading ? <Tabs count={itemsCount} /> : (
            <div className="pt-8 flex flex-col lg:flex-row gap-2 animate-pulse">
              <div className="w-24 h-6 bg-gray-200 rounded-lg"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-lg"></div>
            </div>
          )}
        </div>

        {/* Stacked list */}
        <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
          {typeof items === 'object' && !isItemsLoading ? items.map((item: T_FULL_ITEM) => {
            const end = moment(new Date(item.bidEndDate)).fromNow();
            return (
              <li key={item.id}>
                <div className="group block">
                  <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1 pl-1 md:grid md:grid-cols-3 md:gap-4">
                        <div>
                          <p className="truncate text-sm font-medium text-purple-600">{item.name}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{item.description}</span>
                          </p>
                        </div>
                        <div>
                          <div>
                            <p className="text-sm flex items-center text-gray-900">
                              <BanknotesIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                                aria-hidden="true"
                              />
                              Final bid price is {toCurrency.format(item.Bid.length > 0 ? item.Bid[0].bidPrice : item.origPrice)}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <ClockIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                                aria-hidden="true"
                              />
                              Ended {end}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="truncate text-sm font-medium text-purple-600"></p>
                          <p className="truncate text-sm font-medium text-purple-600">Bidding Winner</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{item.Bid.length > 0 ? item.Bid[0].user.email : ""}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          }) : <TableSkeleton />}
        </ul>
      </div>
    </main>
  )
}
