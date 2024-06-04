import React from "react"
import { FaArrowDown, FaArrowUp, FaComment, FaShare } from "react-icons/fa"

const PostDetails = () => {
    const authorImage = "https://via.placeholder.com/40"
    const authorName = "John Doe"
    const postTitle = "Sample Post Title"
    const postDescription = "This is a sample description for the post."
    const tag = "SampleTag"
    const postTime = new Date()
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <div className="flex items-center mb-4">
                <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full mr-4" />
                <div>
                    <p className="text-lg font-semibold">{authorName}</p>
                    <p className="text-sm text-gray-600">{new Date(postTime).toLocaleString()}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{postTitle}</h2>
            <p className="text-gray-700 mb-4">{postDescription}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
            <hr className="mt-4"/>
            <div className="flex items-center mt-4">
                <button className="flex items-center mr-4 text-green-500 hover:text-green-700">
                    <FaArrowUp className="mr-1" />
                    UpVote
                </button>
                <button className="flex items-center mr-4 text-red-500 hover:text-red-700">
                    <FaArrowDown className="mr-1" />
                    DownVote
                </button>
                <button className="flex items-center mr-4 text-gray-500 hover:text-gray-700">
                    <FaComment className="mr-1" />
                    Comment
                </button>
                <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <FaShare className="mr-1" />
                    Share
                </button>
            </div>
        </div>
    )
}

export default PostDetails