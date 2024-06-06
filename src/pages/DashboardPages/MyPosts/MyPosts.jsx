import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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

const MyPosts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {
        data: myPosts,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["myPosts"],
        queryFn: async () => {
            const res = await axiosSecure(`/myPosts/${user.email}`)
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
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong!")
        }
    }

    // console.log(myPosts[0])
    if (isFetching) return <SmallLoading />

    return (
        <div className="/min-h-[50vh] pb-12">
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
                        {myPosts.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell className="font-medium min-w-52">{post.postTitle}</TableCell>
                                <TableCell className="text-center">{post.upVote}</TableCell>
                                <TableCell className="text-right">
                                    <Button>
                                        <Link to={`/comments/${post._id}`}>Comment</Link>
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
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MyPosts
