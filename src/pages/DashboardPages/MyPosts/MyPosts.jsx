import React, { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import SmallLoading from "@/components/SmallLoading"
import useAxiosSecure from "@/hooks/useAxiosSecure"
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
import toast from "react-hot-toast"
import Pagination from "@/components/Pagination"

const MyPosts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 5
    const { data, isFetching: isFetching2 } = useQuery({
        queryKey: ["myPostsCount"],
        queryFn: async () => {
            const res = await axiosSecure(`/myPostsCount`)
            // console.log(res.data)
            return res.data
        },
        initialData: {},
    })
    const { count } = data

    const {
        data: myPosts,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["myPosts", currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/myPosts/${user.email}?size=${itemPerPage}&page=${currentPage}`)
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    const handleDeletePost = async (post) => {
        // console.log(post)
        try {
            const res = await axiosSecure.delete(`/deletePost/${post._id}`)
            // console.log(res.data)
            if (res.data.deletedCount > 0) toast.success("Post deleted successfully!")
            refetch()
            const cRes = await axiosSecure.delete(`/deleteComments/${post._id}`)
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong!")
        }
    }

    // console.log(myPosts[0])
    if (isFetching || isFetching2) {
        return <SmallLoading />
    }

    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">My Posts</h2>
            <div>
                <Table>
                    <TableCaption>A list all of your posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pr-0">Post Title</TableHead>
                            <TableHead className="w-[100px] whitespace-nowrap">Number of votes</TableHead>
                            <TableHead colSpan="2" className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isFetching ? (
                            <TableRow>
                                <TableCell colSpan="4" className="">
                                    <SmallLoading></SmallLoading>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {myPosts.map((post) => (
                                    <TableRow key={post._id}>
                                        <TableCell className="font-medium min-w-52">{post.postTitle}</TableCell>
                                        <TableCell className="text-center">{post.upVote}</TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                to={`/comments/${post._id}`}
                                                type="button"
                                                className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-pink-700   hover:shadow-lg active:opacity-85"
                                            >
                                                Comment
                                            </Link>
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
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will delete the post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeletePost(post)}
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
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    count={count}
                    itemPerPage={itemPerPage}
                ></Pagination>
            </div>
        </div>
    )
}

export default MyPosts
