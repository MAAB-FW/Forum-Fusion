import React, { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import toast from "react-hot-toast"
import SmallLoading from "@/components/SmallLoading"
import Pagination from "@/components/Pagination"

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 5
    const { data, isFetching: isFetching2 } = useQuery({
        queryKey: ["totalData", search],
        queryFn: async () => {
            const res = await axiosSecure(`/totalData?search=${search}`)
            // console.log(res.data)
            return res.data
        },
        initialData: {},
    })
    const { totalUsers: count } = data
    console.log(data)
    const {
        data: users,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["manageUsers", search, currentPage],
        enabled: !!data,
        queryFn: async () => {
            const res = await axiosSecure(`/manageUsers?search=${search}&size=${itemPerPage}&page=${currentPage}`)
            return res.data
        },
        initialData: [],
    })
    // console.log(users)

    const handleMakeAdmin = (user) => {
        console.log(user)
        axiosSecure
            .patch(`/makeAdmin/${user._id}`)
            .then((res) => {
                console.log(res)
                if (res.data.modifiedCount > 0) toast.success("Success!")
                refetch()
            })
            .catch((e) => {
                console.log(e)
                toast.error("Something went wrong!")
            })
    }

    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Manage Users</h2>
            <div>
                <div className="form relative my-4">
                    <div className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                        <svg
                            width="17"
                            height="16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-labelledby="search"
                            className="w-5 h-5 text-gray-700"
                        >
                            <path
                                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                                stroke="currentColor"
                                strokeWidth="1.333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input w-full rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                        placeholder="Type Username..."
                        required=""
                        type="text"
                    />
                    <button
                        hidden={!search}
                        onClick={() => setSearch("")}
                        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <Table>
                <TableCaption>
                    You can make a user <span className="underline">Admin</span> by clicking on the{" "}
                    <span className="font-bold">Make Admin</span> button.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Username</TableHead>
                        <TableHead className="">Email</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                        <TableHead className="text-center">Subscription Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isFetching || isFetching2 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="">
                                <SmallLoading></SmallLoading>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium min-w-52">{user.userName}</TableCell>
                                    <TableCell className="">{user.email}</TableCell>
                                    <TableCell className="text-center">
                                        {user.role === "admin" ? (
                                            <Badge variant="destructive">Admin</Badge>
                                        ) : (
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <span className="px-4 py-2.5 rounded bg-slate-950 hover:bg-slate-800 whitespace-nowrap font-medium text-white">
                                                        Make admin
                                                    </span>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will make the user an admin.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleMakeAdmin(user)}
                                                            className="bg-green-600 hover:bg-green-800"
                                                        >
                                                            <span>Confirm</span>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </TableCell>
                                    <TableCell className={`text-center uppercase `}>
                                        <Badge
                                            variant="secondary"
                                            className={`bg-[#c77b30] hover:bg-[#fdb267] ${
                                                user.badge === "gold" && "bg-[#ffd700] hover:bg-[#ffe762]"
                                            }`}
                                        >
                                            {user.badge}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                count={count}
                itemPerPage={itemPerPage}
            ></Pagination>
        </div>
    )
}

export default ManageUsers
