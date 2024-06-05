import React from "react"
import SinglePost from "./SinglePost"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/Pagination"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "@/hooks/useAxiosPublic"

const PostContainer = () => {
    const axiosPublic = useAxiosPublic()

    const { data: posts } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic("/posts")
            console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">All Posts:</h2>
                <Button>Sort by Popularity</Button>
            </div>
            <div className="my-10 ">
                {posts.map((post) => (
                    <SinglePost key={post._id} post={post}></SinglePost>
                ))}
            </div>
            <Pagination></Pagination>
        </div>
    )
}

export default PostContainer
