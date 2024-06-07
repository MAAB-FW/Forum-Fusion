import React from "react"
import { FaRegComment } from "react-icons/fa6"
import { LuVote } from "react-icons/lu"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const SinglePost = ({ post }) => {
    const { _id, tags, authorImage, postTitle, postTime, upVote, commentsCount } = post

    return (
        <Link
            to={`/post/${_id}`}
            className="my-6 flex flex-col border border-gray-300 rounded-lg p-4 shadow-md hover:bg-slate-100"
        >
            <div className="flex items-center mb-2">
                <img src={authorImage} alt="Author" className="w-10 h-10 object-cover rounded-full mr-2" />
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center justify-between w-full">
                    <h2 className="text-lg font-semibold">{postTitle}</h2>
                    <p className="mb-2 text-gray-500 text-sm">Posted: {new Date(postTime).toLocaleString()}</p>
                </div>
            </div>
            <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="text-gray-600 flex flex-wrap gap-1">
                    {tags?.map((tag, id) => (
                        <div key={id}>
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                                #{tag.name}
                            </span>{" "}
                        </div>
                    ))}
                </div>

                <div className="flex items-center">
                    <div className="flex items-center gap-2 mr-4">
                        <FaRegComment className="text-lg" />
                        {commentsCount} Comments
                    </div>
                    <div className="flex items-center gap-2">
                        <LuVote className="text-xl" />
                        {upVote} Votes
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SinglePost

SinglePost.propTypes = {
    post: PropTypes.object,
}
