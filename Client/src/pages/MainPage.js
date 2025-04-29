import React from 'react'

export default function MainPage() {
    return (
        <div>
            <h1 className=' lg:mx-32 text-5xl font-bold text-green-500'>
                Convert Your Currency Today
            </h1>
            <p className='lg:mx-32 opacity-40 py-6'>
                Welcome to the Currency Converter App! Use our tool
                to convert currencies easily and quickly.Simply enter the amount and select the currencies
                you want to convert from and to.Click the button below to start converting!
            </p>

            <div>
                <section>
                    <form>
                        <div className="mb-6">
                            <label htmlFor='' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Date
                            </label>
                            <input type="date" id="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="john.doe@company.com" required />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}
