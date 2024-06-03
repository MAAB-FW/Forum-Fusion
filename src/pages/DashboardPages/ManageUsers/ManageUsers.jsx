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

import { Button } from "@/components/ui/button"

const ManageUsers = () => {
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
                    <TableRow>
                        <TableCell className="font-medium min-w-52">Bappy</TableCell>
                        <TableCell className="">a@b.com</TableCell>
                        <TableCell className="text-center">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button>Make admin</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action will make the user an admin.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-green-600 hover:bg-green-800">Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        <TableCell className="text-center">Membership</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default ManageUsers
