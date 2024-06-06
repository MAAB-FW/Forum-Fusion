import React from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import CommentRow from "./CommentRow"
import SmallLoading from "@/components/SmallLoading"

const CommentsTable = () => {
    const { id } = useParams()

    const axiosSecure = useAxiosSecure()
    const {
        data: comments,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await axiosSecure(`/comments/${id}`)
            return res.data
        },
        initialData: [],
    })

    if (isFetching) {
        return <SmallLoading />
    }

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
                    {comments &&
                        comments.map((comment) => (
                            <CommentRow key={comment._id} comment={comment} refetch={refetch}></CommentRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CommentsTable
