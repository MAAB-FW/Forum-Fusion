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
import { Link } from "react-router-dom"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import SmallLoading from "@/components/SmallLoading"
import Pagination from "@/components/Pagination"

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 5
    const { data, isFetching: isFetching2 } = useQuery({
        queryKey: ["totalData"],
        queryFn: async () => {
            const res = await axiosSecure(`/totalData`)
            // console.log(res.data)
            return res.data
        },
        initialData: {},
    })
    const { totalReports: count } = data

    const {
        data: comments,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["reportedComments", currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/reportedComments?size=${itemPerPage}&page=${currentPage}`)
            return res.data
        },
        initialData: [],
    })
    console.log(comments)
    const handleDeleteComment = async (comment) => {
        try {
            const res = await axiosSecure.delete(`/deleteReportedComment/${comment._id}?postId=${comment.postId}`)
            console.log(res.data)
            if (res.data.deletedCount > 0) toast.success("comment deleted successfully!")
            refetch()
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong!")
        }
    }

    const readMore = (comment) => {
        Swal.fire({
            text: comment,
            confirmButtonText: "Cancel",
        })
    }

    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Reported Comments</h2>
            <div>
                <Table>
                    <TableCaption>A list all of your posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pr-0">Reported Comment</TableHead>
                            <TableHead className="w-[100px] whitespace-nowrap">Report/Feedback</TableHead>
                            <TableHead className="text-center">Post Link</TableHead>
                            <TableHead className="text-center">Action</TableHead>
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
                                {comments.map((comment) => (
                                    <TableRow key={comment._id}>
                                        <TableCell className="font-medium min-w-52 ">
                                            {comment.comment.slice(0, 20)}
                                            {comment.comment.length > 20 && (
                                                <>
                                                    ...
                                                    <button
                                                        onClick={() => readMore(comment.comment)}
                                                        className="text-blue-700 hover:underline"
                                                    >
                                                        ReadMore
                                                    </button>
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{comment.report}</TableCell>
                                        <TableCell className="text-center">
                                            {/* <Button> */}
                                            <Link
                                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                                to={`/post/${comment?.postId}`}
                                            >
                                                Post Link
                                            </Link>
                                            {/* </Button> */}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <span className="bg-red-500 hover:bg-red-700 font-medium text-white rounded px-4 py-2.5">
                                                        Delete
                                                    </span>
                                                    {/* <Button>Make admin</Button> */}
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will delete the reported comment.
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
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                count={count}
                itemPerPage={itemPerPage}
            ></Pagination>
        </div>
    )
}

export default ReportedComments
