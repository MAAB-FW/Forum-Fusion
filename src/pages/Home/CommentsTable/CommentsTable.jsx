import Pagination from "@/components/Pagination";
import SmallLoading from "@/components/SmallLoading";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentRow from "./CommentRow";

const CommentsTable = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 5;
    const { data = {}, isLoading: isLoading2 } = useQuery({
        queryKey: ["commentsCount"],
        queryFn: async () => {
            const res = await axiosSecure(`/commentsCount/${id}`);
            // console.log(res.data)
            return res.data;
        },
        // initialData: {},
    });
    const { count = 0 } = data;

    const {
        data: comments = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["comments", currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/comments/${id}?size=${itemPerPage}&page=${currentPage}`);
            return res.data;
        },
        // initialData: [],
    });

    if (isLoading || isLoading2) {
        return <SmallLoading />;
    }

    return (
        <div className="py-20">
            <h2 className="text-center font-bold mb-10">All Comments of the post</h2>
            {comments.length > 0 ? (
                <>
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
                            {comments &&
                                comments.map((comment) => (
                                    <CommentRow key={comment._id} comment={comment} refetch={refetch}></CommentRow>
                                ))}
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
                    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-bold text-gray-700">No Comments Yet</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentsTable;
