import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "/F.Fusion.png"
import { Link, NavLink } from "react-router-dom"
import { MdMenuOpen } from "react-icons/md"
import { MdNotifications } from "react-icons/md"
import useAuth from "@/hooks/useAuth"
import toast from "react-hot-toast"
import { useRole } from "@/hooks/useRole"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"

const Navbar = () => {
    const { user, logoutUser } = useAuth()
    const { role } = useRole()

    const axiosPublic = useAxiosPublic()
    const { data: announcements } = useQuery({
        queryKey: ["announcement"],
        queryFn: async () => {
            const res = await axiosPublic("/announcements")
            return res.data
        },
        initialData: [],
    })

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                toast.success("Successfully logged out!")
            })
            .catch(() => {
                toast.error("Something went wrong!")
            })
    }

    return (
        <nav className="bg-white py-2.5 h-14 flex items-center justify-center shadow">
            <div className="flex items-center justify-between mx-auto md:w-[85%] w-[90%] max-w-7xl">
                <Link to="/" className="hidden md:flex items-center">
                    <img src={logo} className="h-6 mr-3 sm:h-9 object-cover" alt="Logo" />
                    <span className="hidden md:flex text-xl font-semibold  dark:text-white whitespace-nowrap">Forum Fusion</span>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex md:hidden">
                        <MdMenuOpen className="text-4xl"></MdMenuOpen>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Forum Fusion</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                to="/"
                                className="w-full px-2 py-1.5 hover:text-purple-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Home
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                to="/membership"
                                className="w-full px-2 py-1.5 hover:text-purple-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Membership
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center justify-between w-full md:flex md:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="hidden md:flex mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                // aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/membership"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Membership
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3 lg:order-2">
                    <div className="relative">
                        {announcements.length > 0 && (
                            <span className="absolute text-white text-xs bg-red-600 px-1 rounded-2xl -right-1 -top-1">
                                {announcements.length}
                            </span>
                        )}
                        <MdNotifications className="text-3xl hover:text-purple-700 cursor-pointer"></MdNotifications>
                    </div>
                    {!user ? (
                        <Button className="p-0">
                            <Link className="py-2 px-4" to="/joinUs">
                                Join Us
                            </Link>
                        </Button>
                    ) : (
                        <DropdownMenu className="rounded-full">
                            <DropdownMenuTrigger className="size-8 rounded-full">
                                <img
                                    className="rounded-full object-cover border size-8"
                                    src={user.photoURL}
                                    alt=""
                                    referrerPolicy="no-referrer"
                                />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="p-0">
                                    {/* TODO: dynamic route */}
                                    <Link
                                        className="px-2 py-1.5 w-full"
                                        to={`${role === "admin" ? "dashboard/adminProfile" : "dashboard/myProfile"}`}
                                    >
                                        DashBoard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-0">
                                    <button className="px-2 py-1.5 w-full text-left" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
