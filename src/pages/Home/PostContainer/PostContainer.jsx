import React from "react"
import SinglePost from "./SinglePost"

const PostContainer = () => {
    return (
        <div>
            <h2 className="text-xl font-bold">All Posts:</h2>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
            </div>
        </div>
    )
}

export default PostContainer
