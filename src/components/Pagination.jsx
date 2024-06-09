import React from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import PropTypes from "prop-types"

const Pagination = ({ currentPage, setCurrentPage, count = 1, itemPerPage }) => {
    const numberOfPages = Math.ceil(count / itemPerPage)
    const pages = [...Array(numberOfPages).keys()]

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-base-100 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between items-center sm:hidden">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <p>
                    {currentPage + 1}/{pages.length}
                </p>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pages.length - 1}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-base-content opacity-90">
                        Showing <span className="font-medium">{currentPage + 1}</span> of{" "}
                        <span className="font-medium">{pages.length} </span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <pre></pre>
                            <IoIosArrowBack />
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                aria-current="page"
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 
                        ${currentPage === page ? "text-white bg-[#7e22ce]" : "hover:bg-gray-200"}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pages.length - 1}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <IoIosArrowForward />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination
Pagination.propTypes = {
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    count: PropTypes.number,
    itemPerPage: PropTypes.number,
}
