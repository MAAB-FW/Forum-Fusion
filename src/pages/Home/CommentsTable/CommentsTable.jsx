import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

const CommentsTable = () => {
    const comment = "Exploring the Wonders of React and Tailwind CSS"
    return (
        <div className="py-20">
            <h2 className="text-center font-bold mb-10">All Comments of the post</h2>
            <Table>
                {/* <TableCaption>A list all of your posts.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="pr-0">Comment Text</TableHead>
                        <TableHead className="w-[100px] whitespace-nowrap">Email of the commenter</TableHead>
                        <TableHead className="text-center">Feedback</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {/* TODO: upto 20 character, else modal */}
                        <TableCell className="font-medium min-w-52 ">
                            {comment.slice(0, 20)}
                            {comment.length > 20 && (
                                <>
                                    ...
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="text-blue-700 hover:underline">ReadMore</button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="mb-3">Comment Text</DialogTitle>
                                                <DialogDescription>{comment}</DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter className="sm:justify-end">
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </TableCell>
                        <TableCell className="text-center">a@b.com</TableCell>
                        <TableCell className="text-center">
                            <select name="" id="">
                                <option value="Select Feedback">Select Feedback</option>
                                <option value="Bad">Spam</option>
                                <option value="Good">Hate Speech</option>
                                <option value="Best">Harassment</option>
                            </select>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button disabled className="bg-red-500 hover:bg-red-700">
                                Report
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CommentsTable
