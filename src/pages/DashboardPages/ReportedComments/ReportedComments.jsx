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
import useAuth from "@/hooks/useAuth"
import { comment } from "postcss"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const ReportedComments = () => {
    const { user } = useAuth()
    const handleDeleteComment = (comment) => {}
    const post = []
    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Reported Comments</h2>
            <div>
                <Table>
                    <TableCaption>A list all of your posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pr-0">Comment</TableHead>
                            <TableHead className="w-[100px] whitespace-nowrap">Report/Feedback</TableHead>
                            <TableHead className="text-center">Post Link</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {myPosts.map((post) => ( */}
                        <TableRow key={post._id}>
                            <TableCell className="font-medium min-w-52">{post.postTitle}</TableCell>
                            <TableCell className="text-center">{post.upVote}</TableCell>
                            <TableCell className="text-center">
                                <Button>
                                    <Link to={`/comments/${post._id}`}>Post Link</Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <span className="bg-red-500 hover:bg-red-700 font-medium text-white rounded px-4 py-2.5">
                                            Delete
                                        </span>
                                        {/* <Button>Make admin</Button> */}
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
                                                onClick={() => handleDeleteComment(comment)}
                                                className="bg-green-600 hover:bg-green-800"
                                            >
                                                <span>Confirm</span>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ReportedComments
