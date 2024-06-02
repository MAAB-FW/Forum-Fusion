import React from "react"
import { FaRegComment } from "react-icons/fa6"
import { LuVote } from "react-icons/lu"
import { Link } from "react-router-dom"

const SinglePost = () => {
    const _id = Math.floor(Math.random() * 100)
    const tags = ["React", "Tailwind CSS", "Web_Development"]
    const time = new Date().toLocaleString() // Example time format
    const commentsCount = Math.floor(Math.random() * 100) // Random comments count
    const votesCount = Math.floor(Math.random() * 100) // Random votes count
    const authorImage = "https://randomuser.me/api/portraits/men/1.jpg" // Example author image URL
    const title = "Exploring the Wonders of React and Tailwind CSS"
    return (
        <Link to={`/post/${_id}`} className="flex flex-col border border-gray-300 rounded-lg p-4 shadow-md hover:bg-slate-100">
            <div className="flex items-center mb-2">
                <img src={authorImage} alt="Author" className="w-10 h-10 rounded-full mr-2" />
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="mb-2">Posted: {time}</p>
                </div>
            </div>
            <div className="mb-2">
                <span className="text-gray-600">{tags.map((tag) => `#${tag} `)}</span>
            </div>

            <div className="flex items-center">
                <div className="flex items-center gap-3 mr-4">
                    <FaRegComment className="text-lg" />
                    {commentsCount} Comments
                </div>
                <div className="flex items-center gap-3">
                    <LuVote className="text-xl" />
                    {votesCount} Votes
                </div>
            </div>
        </Link>
    )
}

export default SinglePost
