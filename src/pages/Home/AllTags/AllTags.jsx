import SectionTitle from "@/components/SectionTitle"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import React from "react"

const AllTags = () => {
    const axiosPublic = useAxiosPublic()
    const { data } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosPublic("/tags")
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })
    return (
        <div>
            <SectionTitle title="AllTags"></SectionTitle>
            <div className=" text-center *:m-4 my-10 md:w-3/4 mx-auto">
                {data.map((item) => (
                    <button
                        key={item._id}
                        className="inline-flex items-center rounded-full border-2 border-muted-1 bg-muted-1 px-2 py-1 text-base font-semibold text-heading shadow-sm"
                    >
                        <svg fill="currentColor" viewBox="0 0 8 8" className="mr-1 h-2.5 w-2.5 text-green-500">
                            <circle cx={4} cy={4} r={3} />
                        </svg>
                        {item.tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AllTags
