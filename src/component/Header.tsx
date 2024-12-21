import React from 'react';

export default function Header() {
    return (
        <>
            <nav className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                    <ul className="flex space-x-6">
                        <li><a href="#" className="text-white hover:text-gray-400">Swap</a></li>
                        <li><a href="#" className="text-white hover:text-gray-400">Explore</a></li>
                        <li><a href="#" className="text-white hover:text-gray-400">NFTs</a></li>
                        <li className="relative group">
                            <button className="text-white hover:text-gray-400 flex items-center">
                                Pool
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <ul className="absolute left-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg hidden group-hover:block">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Option 1</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Option 2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search tokens and NFT collections"
                        className="w-80 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring focus:ring-purple-500"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Connect</button>
                </div>
            </nav>


        </>
    );
}
