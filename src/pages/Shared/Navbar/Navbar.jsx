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

const Navbar = () => (
    <nav className="bg-white py-2.5 px-7 shadow-xl ">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
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
                            className="w-full px-2 py-1 hover:text-purple-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            Home
                        </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                        <NavLink
                            to="/membership"
                            className="w-full px-2 py-1 hover:text-purple-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
                {/* <div className="hidden mt-2 mr-4 sm:inline-block">
                    <span></span>
                </div> */}
                <MdNotifications className="text-3xl"></MdNotifications>
                <Button>
                    <Link to='/joinUs'>Join Us</Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger className="size-8 rounded-full">
                        <img
                            className="rounded-full"
                            src="https://scontent.fdac140-1.fna.fbcdn.net/v/t39.30808-6/440156273_122126113916257230_1150043911485938287_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rvOlRASlRV4Q7kNvgFwCnSz&_nc_ht=scontent.fdac140-1.fna&oh=00_AYB88PbTh-NzVEYXGA7CfPRhUoMC1DHFCYAFExm0LTOUmA&oe=66606BE4"
                            alt=""
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>User Name</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>DashBoard</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </nav>

    // <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
    //     <div className="bg-white shadow">
    //         <div className="container mx-auto px-4">
    //             <div className="flex items-center justify-between py-4">
    //                 <div>logo</div>
    //                 <div className="hidden sm:flex sm:items-center">
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
    //                         Products
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
    //                         Marketplace
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
    //                         Partners
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600">
    //                         Pricing
    //                     </a>
    //                 </div>

    //                 <div className="hidden sm:flex sm:items-center">
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
    //                         Sign in
    //                     </a>
    //                     <a
    //                         href="#"
    //                         className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
    //                     >
    //                         Sign up
    //                     </a>
    //                 </div>

    //                 <div className="sm:hidden cursor-pointer">
    //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" viewBox="0 0 24 24">
    //                         <path
    //                             fill="currentColor"
    //                             d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"
    //                         />
    //                     </svg>
    //                 </div>
    //             </div>

    //             <div className="block sm:hidden bg-white border-t-2 py-2">
    //                 <div className="flex flex-col">
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">
    //                         Products
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">
    //                         Marketplace
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">
    //                         Partners
    //                     </a>
    //                     <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">
    //                         Pricing
    //                     </a>
    //                     <div className="flex justify-between items-center border-t-2 pt-2">
    //                         <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
    //                             Sign in
    //                         </a>
    //                         <a
    //                             href="#"
    //                             className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600"
    //                         >
    //                             Sign up
    //                         </a>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
)

export default Navbar
