import React from "react"
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
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "@/hooks/useAxiosSecure"

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users, refetch } = useQuery({
        queryKey: ["manageUsers"],
        queryFn: async () => {
            const res = await axiosSecure("/users")
            return res.data
        },
        initialData: [],
    })
    console.log(users)

    return (
        <div className="/min-h-[50vh] /pb-6">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Manage Users</h2>
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
                                            <Button>Make admin</Button>
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
                                                <AlertDialogAction className="bg-green-600 hover:bg-green-800">
                                                    Confirm
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
                </TableBody>
            </Table>
        </div>
    )
}

export default ManageUsers
