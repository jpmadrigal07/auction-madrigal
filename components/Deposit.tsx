import Link from 'next/link'
import React from 'react'

const Deposit = () => {
    return (
        <main className="pb-16 pt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium text-gray-900">Deposit</h2>
                </div>
                <div className="mt-4">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-600">
                        Amount
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                                USD
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href="/home" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                        Deposit
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Deposit