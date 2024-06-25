import SmallLoading from "@/components/SmallLoading"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import { LinkedinIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
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
import { CgSpinner } from "react-icons/cg"

const PostDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const [commenting, setCommenting] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    // const [voteFetching, setVoteFetching] = useState(false)
    // const [post, setPost] = useState({})
    // const [reload, setReload] = useState(false)
    // const [isFetching, setIsFetching] = useState(true)

    const { data: post, isFetching } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await axiosPublic(`/post/${id}`)
            // console.log(res.data)
            return res.data
        },
        initialData: {},
    })

    const {
        data: voteFc,
        // refetch: voteRefetch,
        isFetching: voteFetching,
    } = useQuery({
        queryKey: ["getVote"],
        enabled: !!user && !!post,
        queryFn: async () => {
            const res = await axiosSecure(`/getVote/${id}`)
            setVote(res.data)
            return res.data
        },
        initialData: {},
    })

    // useEffect(() => {
    //     axiosPublic(`/post/${id}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setPost(res.data)
    //             if (user) {
    //                 setVoteFetching(true)
    //                 axiosSecure(`/getVote/${_id}`).then((res) => {
    //                     // console.log(res.data)
    //                     setVote(res.data)
    //                     setVoteFetching(false)
    //                 })
    //             }
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //         })
    // }, [axiosPublic, axiosSecure, id, reload, user])

    const { data: comments, refetch: commentRefetch } = useQuery({
        queryKey: ["comments"],
        enabled: !!user && !!post,
        queryFn: async () => {
            const res = await axiosSecure(`/comments/${id}`)
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    const { _id, tags, authorImage, authorName, postDescription, postTitle, postTime } = post
    const shareUrl = `https://maab-fw-assignment-12.vercel.app/post/${_id}`
    // ------------------------------------------------------------------------

    const [vote, setVote] = useState(voteFc)

    console.log(vote)

    // useEffect(() => {
    //     if (user && post._id) {
    //         const getVote = async () => {
    //             const res = await axiosSecure(`/getVote/${_id}`)
    //             console.log(res.data)
    //             setVote(res.data)
    //         }
    //         getVote()
    //     }
    // }, [_id, axiosSecure, user, post])

    const [upToggle, setUpToggle] = useState(vote.upVote)
    const [downToggle, setDownToggle] = useState(vote.downVote)
    // console.log(upToggle, downToggle)
    useEffect(() => {
        // setVoteFetching(true)
        if (voteFc) {
            setDownToggle(voteFc.downVote)
            setUpToggle(voteFc.upVote)
            setVote(voteFc)
            // setVoteFetching(false)
        }
    }, [voteFc])

    // const { mutate } = useMutation({
    //     mutationKey: ["updateVotes"],
    //     mutationFn: ({ vote, u, d }) => {
    //         const voteData = {
    //             upVote: u,
    //             downVote: d,
    //             voterEmail: user.email,
    //             voteTime: new Date(),
    //             postId: _id,
    //             voteId: vote._id,
    //             vote: vote,
    //         }
    //         axiosSecure
    //             .put("/updateVotes", voteData)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 if (res.data.upsertedId || res.data.insertedId) {
    //                     voteRefetch()
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log(e)
    //             })
    //     },
    // })

    // const { mutate: mutateCount } = useMutation({
    //     mutationKey: ["updateVoteCount"],
    //     mutationFn: ({ u, d }) => {
    //         const voteData = {
    //             upVote: u,
    //             downVote: d,
    //             voterEmail: user.email,
    //         }
    //         axiosSecure
    //             .put("/updateVoteCount", voteData)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 if (res.data.upsertedCount || res.data.modifiedCount) {
    //                     // voteRefetch()
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log(e)
    //             })
    //     },
    // })

    const handleComment = (e) => {
        e.preventDefault()
        setCommenting(true)
        const comment = e.target.comment.value
        const commentData = {
            comment,
            postId: _id,
            postTitle: postTitle,
            commentTime: new Date(),
            commentAuthorName: user.displayName,
            commentAuthorEmail: user.email,
            commentAuthorImage: user.photoURL,
        }
        console.log(commentData)
        axiosSecure
            .post(`/comments/${_id}`, commentData)
            .then((res) => {
                console.log(res.data)
                if (res.data.result.insertedId) {
                    commentRefetch()
                    e.target.reset()
                    setCommenting(false)
                }
            })
            .catch((e) => {
                console.log(e)
                setCommenting(false)
            })
    }

    const handleVote = (e) => {
        if (e === "up") {
            setUpToggle(!upToggle)
            setDownToggle(false)
            // console.log("up")
            // mutate({ vote: "up", u: !upToggle, d: false })
            const voteData = {
                upVote: !upToggle,
                downVote: false,
                voterEmail: user.email,
                voteTime: new Date(),
                postId: _id,
                voteId: vote._id,
                vote: "up",
            }
            axiosSecure
                .put("/updateVotes", voteData)
                .then((res) => {
                    console.log(res.data)
                    // // setReload(!reload)
                    if (res.data.result.upsertedId || res.data.result.insertedId) {
                        // voteRefetch()
                        console.log(res.data.result)
                    }
                    if (res.data.postVoteUpdate) {
                        // console.log(res.data.postVoteUpdate)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            setUpToggle(false)
            setDownToggle(!downToggle)
            // console.log("down")
            // mutate({ vote: "down", u: false, d: !downToggle })
            const voteData = {
                upVote: false,
                downVote: !downToggle,
                voterEmail: user.email,
                voteTime: new Date(),
                postId: _id,
                voteId: vote._id,
                vote: "down",
            }
            axiosSecure
                .put("/updateVotes", voteData)
                .then((res) => {
                    console.log(res.data)
                    // // setReload(!reload)
                    if (res.data.upsertedId || res.data.insertedId) {
                        // voteRefetch()
                        console.log(res.data.result)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    if (voteFetching || isFetching) {
        return <SmallLoading />
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-10">
            <div className="flex items-center mb-4">
                <img src={authorImage} alt={authorName} className="w-10 h-10 object-cover rounded-full mr-4" />
                <div>
                    <p className="text-lg font-semibold">{authorName}</p>
                    <p className="text-sm text-gray-600">{new Date(postTime).toLocaleString()}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{postTitle}</h2>
            <p className="text-gray-700 mb-4">{postDescription}</p>
            {tags?.map((tag, idx) => (
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
                    <button
                        onClick={() => handleVote("up")}
                        disabled={!user}
                        className={`flex  px-2 rounded-2xl py-1 items-center mr-4 text-green-500 ${
                            user && upToggle && "bg-green-500 text-white"
                        }`}
                    >
                        <FaArrowUp className="mr-1" />
                        UpVote
                    </button>
                    <button
                        onClick={() => handleVote("down")}
                        disabled={!user}
                        className={`flex  px-2 rounded-2xl py-1 items-center mr-4 text-red-500 ${
                            user && downToggle && "bg-red-500 text-white"
                        }`}
                    >
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
                                            disabled={commenting}
                                            type="submit"
                                            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                                        >
                                            {commenting ? (
                                                <CgSpinner className="wf animate-spin text-xl w-[93px]" />
                                            ) : (
                                                "Post Comment"
                                            )}
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
