import React, { useState } from "react"
import SinglePost from "./SinglePost"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/Pagination"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import SmallLoading from "@/components/SmallLoading"

const PostContainer = () => {
    const axiosPublic = useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 5
    const [popularity, setPopularity] = useState(false)

    const { data, isFetching: isFetching2 } = useQuery({
        queryKey: ["postsCount"],
        queryFn: async () => {
            const res = await axiosPublic("/postsCount")
            // console.log(res.data)
            return res.data
        },
        initialData: {},
    })
    const { count } = data

    const { data: posts, isFetching } = useQuery({
        queryKey: ["posts", currentPage, popularity],
        queryFn: async () => {
            const res = await axiosPublic(`/posts?size=${itemPerPage}&page=${currentPage}&popularity=${popularity}`)
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    if (isFetching || isFetching2) {
        return <SmallLoading />
    }

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">All Posts:</h2>
                <Button
                    className={` ${popularity ? "bg-red-600 hover:bg-gray-700" : "hover:bg-red-700"}`}
                    onClick={() => {
                        setPopularity(!popularity)
                    }}
                >
                    Sort by Popularity
                </Button>
            </div>
            <div className="my-10 ">
                {posts.map((post) => (
                    <SinglePost key={post._id} post={post}></SinglePost>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                count={count}
                itemPerPage={itemPerPage}
            ></Pagination>
        </div>
    )
}

export default PostContainer
