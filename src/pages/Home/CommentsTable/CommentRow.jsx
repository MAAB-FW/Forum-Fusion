import React, { useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import PropTypes from "prop-types"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import Swal from "sweetalert2"

const CommentRow = ({ comment, refetch }) => {
    const [feedback, setFeedback] = useState("")
    // const [disable, setDisable] = useState("")
    const axiosSecure = useAxiosSecure()
    const handleFeedback = (fedBk) => {
        setFeedback(fedBk)
    }
    // console.log(comment)
    const handleReport = () => {
        // setDisable(id)
        axiosSecure
            .put(`/reports/${comment._id}`, { report: feedback })
            .then((res) => {
                console.log(res.data)
                refetch()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const readMore = (comment) => {
        Swal.fire({
            text: comment,
            confirmButtonText: "Cancel",
        })
    }
    return (
        <TableRow key={comment._id}>
            <TableCell className="font-medium min-w-52 ">
                {comment.comment.slice(0, 20)}
                {comment.comment.length > 20 && (
                    <>
                        ...
                        <button onClick={() => readMore(comment.comment)} className="text-blue-700 hover:underline">
                            ReadMore
                        </button>
                        {/* <Dialog>
                            <DialogTrigger asChild>
                                <button className="text-blue-700 hover:underline">ReadMore</button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md ">
                                <DialogHeader>
                                    <DialogTitle className="mb-3">Comment Text</DialogTitle>
                                    <DialogDescription>{comment.comment}</DialogDescription>
                                </DialogHeader>

                                <DialogFooter className="sm:justify-end">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog> */}
                    </>
                )}
            </TableCell>
            <TableCell className="text-center">{comment.commentAuthorEmail}</TableCell>
            <TableCell className="text-center">
                <select
                    defaultValue={comment?.report}
                    onChange={(e) => handleFeedback(e.target.value)}
                    // disabled={!!comment?.report}
                    name=""
                    id=""
                >
                    <option value="">Select Feedback</option>
                    <option value="Spam">Spam</option>
                    <option value="Hate Speech">Hate Speech</option>
                    <option value="Harassment">Harassment</option>
                </select>
            </TableCell>
            <TableCell className="text-center">
                <Button disabled={!feedback || !!comment?.report} onClick={handleReport} className="bg-red-500 hover:bg-red-700">
                    {comment?.report ? "Reported" : "Report"}
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default CommentRow
CommentRow.propTypes = {
    comment: PropTypes.object,
    refetch: PropTypes.func,
}
