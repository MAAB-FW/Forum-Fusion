import Pagination from "@/components/Pagination";
import SmallLoading from "@/components/SmallLoading";
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
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 5;
    const { data = {}, isLoading: isLoading2 } = useQuery({
        queryKey: ["myPostsCount"],
        queryFn: async () => {
            const res = await axiosSecure(`/myPostsCount`);
            // console.log(res.data)
            return res.data;
        },
        // initialData: {},
    });
    const { count = 0 } = data;

    const {
        data: myPosts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myPosts", currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/myPosts/${user.email}?size=${itemPerPage}&page=${currentPage}`);
            // console.log(res.data)
            return res.data;
        },
        // initialData: [],
    });

    const handleDeletePost = async (post) => {
        // console.log(post)
        try {
            const res = await axiosSecure.delete(`/deletePost/${post._id}`);
            // console.log(res.data)
            if (res.data.deletedCount > 0) toast.success("Post deleted successfully!");
            refetch();
            await axiosSecure.delete(`/deleteComments/${post._id}`);
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong!");
        }
    };

    // console.log(myPosts[0])
    if (isLoading || isLoading2) {
        return <SmallLoading />;
    }

    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">My Posts</h2>
            {myPosts.length > 0 ? (
                <>
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
                            {isLoading ? (
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
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center text-center mt-20">
                        <svg
                            className="w-16 h-16 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            ></path>
                        </svg>
                        <p className="text-xl font-medium text-gray-600">No posts found</p>
                        <p className="mt-2 text-gray-500">You haven&apos;t created any posts yet.</p>
                        <Link
                            to="/dashboard/addPost"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Post
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyPosts;
