import SmallLoading from "@/components/SmallLoading"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import { LinkedinIcon } from "lucide-react"
import React, { useState } from "react"
import { FaArrowDown, FaArrowUp, FaComment, FaShare } from "react-icons/fa"
import { Link, useLocation, useParams } from "react-router-dom"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share"
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"

const PostDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()

    const { data: post, isFetching } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await axiosPublic(`/post/${id}`)
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    const { data: comments, refetch } = useQuery({
        queryKey: ["comments"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure(`/comments/${id}`)
            console.log(res.data)
            return res.data
        },
        initialData: [],
    })
    console.log(comments)

    const { _id, tags, authorImage, authorName, downVote, postDescription, postTitle, upVote, postTime } = post
    const shareUrl = `${import.meta.env.VITE_API_URL}/post/${_id}`
    // console.log(upVote, downVote)

    const [isCommentOpen, setIsCommentOpen] = useState(false)

    const handleComment = (e) => {
        e.preventDefault()
        const comment = e.target.comment.value
        const commentData = {
            comment,
            postId: _id,
            commentTime: new Date(),
            commentAuthorName: user.displayName,
            commentAuthorImage: user.photoURL,
        }
        console.log(commentData)
        axiosSecure
            .post("/comments", commentData)
            .then((res) => {
                console.log(res.data)
                if (res.data.insertedId) {
                    refetch()
                    e.target.reset()
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    if (isFetching) {
        return <SmallLoading />
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-10">
            <div className="flex items-center mb-4">
                <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full mr-4" />
                <div>
                    <p className="text-lg font-semibold">{authorName}</p>
                    <p className="text-sm text-gray-600">{new Date(postTime).toLocaleString()}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{postTitle}</h2>
            <p className="text-gray-700 mb-4">{postDescription}</p>
            {tags.map((tag, idx) => (
                <span
                    key={idx}
                    className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                    {tag.name}
                </span>
            ))}
            <hr className="mt-4" />
            <div className="flex flex-col md:flex-row gap-5 justify-between mt-4">
                <div className="flex gap-10">
                    <button disabled={!user} className="flex items-center mr-4 text-green-500 hover:text-green-700">
                        <FaArrowUp className="mr-1" />
                        UpVote
                    </button>
                    <button disabled={!user} className="flex items-center mr-4 text-red-500 hover:text-red-700">
                        <FaArrowDown className="mr-1" />
                        DownVote
                    </button>
                </div>
                <div className="flex gap-10">
                    <button
                        disabled={!user}
                        onClick={() => setIsCommentOpen(!isCommentOpen)}
                        className="flex items-center mr-4 text-gray-500 hover:text-gray-700"
                    >
                        <FaComment className="mr-1" />
                        Comment
                    </button>
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger
                                disabled={!user}
                                className="flex items-center mr-4 text-gray-500 hover:text-gray-700"
                            >
                                <FaShare className="mr-1" />
                                <span>Share:</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Share Post?</AlertDialogTitle>
                                    <AlertDialogDescription className="w-full flex justify-evenly py-5">
                                        <FacebookShareButton url={shareUrl}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl}>
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <LinkedinShareButton url={shareUrl}>
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                        <WhatsappShareButton url={shareUrl}>
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            {!user ? (
                <>
                    <div className="text-center text-yellow-600 font-medium mt-6">
                        You need to Join for vote, comment or share.{" "}
                        <Link state={{ from: location }} to="/joinUs" className="text-green-500 font-bold underline">
                            Join Us
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    {isCommentOpen && (
                        <div>
                            <div className="w-full bg-white rounded-lg  p-2 my-4 ">
                                <h3 className="font-bold">Discussion</h3>

                                <form onSubmit={handleComment}>
                                    <div className="flex flex-col">
                                        {comments?.map((comment) => (
                                            <div key={comment._id} className="border rounded-md p-3 ml-3 my-3">
                                                <div className="flex gap-3 items-center">
                                                    <img
                                                        src={comment.commentAuthorImage}
                                                        className="object-cover w-8 h-8 rounded-full 
                    border-2 border-emerald-400  shadow-emerald-400
                    "
                                                    />

                                                    <h3 className="font-bold">{comment.commentAuthorName}</h3>
                                                </div>

                                                <p className="text-gray-600 mt-2">{comment.comment}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full px-3 my-2">
                                        <textarea
                                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                            name="comment"
                                            placeholder="Type Your Comment"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="w-full flex justify-end px-3">
                                        <button
                                            type="submit"
                                            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PostDetails
