import React from "react"
import SinglePost from "./SinglePost"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/Pagination"

const PostContainer = () => {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">All Posts:</h2>
                <Button>Sort by Popularity</Button>
            </div>
            <div className="my-10 ">
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
                <SinglePost></SinglePost>
            </div>
            <Pagination></Pagination>
        </div>
    )
}

export default PostContainer
