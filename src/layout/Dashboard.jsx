import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import React from "react"
import { FaList, FaPen, FaUser } from "react-icons/fa"
import { MdMenuOpen } from "react-icons/md"
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom"

const Dashboard = () => {
    return (
        <div>
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
                <div className="flex items-center py-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex lg:hidden">
                            <MdMenuOpen className="text-4xl"></MdMenuOpen>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white rounded p-1 m-2 border">
                            {/* <DropdownMenuLabel>Forum Fusion</DropdownMenuLabel> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0">
                                <NavLink
                                    to="/dashboard/myProfile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                                            : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                    }
                                >
                                    <FaUser />
                                    My Profile
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <NavLink
                                    to="/dashboard/addPost"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                                            : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                    }
                                >
                                    <FaPen />
                                    Add Post
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <NavLink
                                    to="/dashboard/myPosts"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                                            : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                    }
                                >
                                    <FaList></FaList>
                                    My Posts
                                </NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <button
                        type="button"
                        className="text-gray-500 hover:text-gray-600"
                        data-hs-overlay="#application-sidebar-dark"
                        aria-controls="application-sidebar-dark"
                    >
                        <HiMenuAlt1 />
                    </button> */}
                </div>
            </div>

            <div
                id="application-sidebar-dark"
                className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-gray-900 border-e border-gray-800 pt-7 pb-10 overflow-y-auto md:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
                <div className="px-6">
                    <Link
                        to="/"
                        className="flex-none text-xl font-semibold text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    >
                        Forum Fusion
                    </Link>
                </div>

                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            <NavLink
                                to="/dashboard/myProfile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                                        : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                }
                            >
                                <FaUser />
                                My Profile
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/addPost"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                                        : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                }
                            >
                                <FaPen />
                                Add Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/myPosts"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-x-3 py-2 px-2.5 bg-gray-700 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                                        : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
                                }
                            >
                                <FaList></FaList>
                                My Posts
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="w-full pt-5 px-4 sm:px-6 md:px-8 lg:ps-72">
                <Outlet></Outlet>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>

        // <div className="flex">
        //     sidebar
        //     <nav className="min-h-screen md:w-[10%] bg-gray-800 text-white p-6">
        //         <ul className="">
        //             <li className="mb-4">
        //                 <NavLink
        //                     to="/dashboard/myProfile"
        //                     end
        //                     className={({ isActive }) => (isActive ? "text-blue-400 " : "text-white")}
        //                 >
        //                     My Profile
        //                 </NavLink>
        //             </li>
        //             <li className="mb-4">
        //                 <NavLink
        //                     to="/dashboard/addPost"
        //                     className={({ isActive }) => (isActive ? "text-blue-400 " : "text-white")}
        //                 >
        //                     Add Post
        //                 </NavLink>
        //             </li>
        //             <li className="">
        //                 <NavLink
        //                     to="/dashboard/myPosts"
        //                     className={({ isActive }) => (isActive ? "text-blue-400  " : "text-white")}
        //                 >
        //                     My Posts
        //                 </NavLink>
        //             </li>
        //         </ul>
        //     </nav>
        //     main content
        //     <div>
        //         <Outlet></Outlet>
        //     </div>
        //     <ScrollRestoration />
        // </div>
    )
}

export default Dashboard
