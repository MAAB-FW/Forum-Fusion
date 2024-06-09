import SectionTitle from "@/components/SectionTitle"
import SmallLoading from "@/components/SmallLoading"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { HiSpeakerphone } from "react-icons/hi"

const Announcement = () => {
    const axiosPublic = useAxiosPublic()
    const { data, isFetching } = useQuery({
        queryKey: ["announcement"],
        queryFn: async () => {
            const res = await axiosPublic("/announcements")
            return res.data
        },
        initialData: [],
    })
    if (data.length === 0) return
    if (isFetching) {
        return <SmallLoading></SmallLoading>
    }
    return (
        <div>
            <SectionTitle title="Announcement"></SectionTitle>
            {data.map((item) => (
                <div key={item._id} className="my-10">
                    <div className="notification !w-full !h-full my-4">
                        <div className="notiglow"></div>
                        <div className="notiborderglow"></div>
                        <div className="notititle ">
                            <h1 className="text-2xl text-slate-50 mb-2 flex items-center gap-2">
                            <HiSpeakerphone className="text-6xl md:text-xl text-red-500"></HiSpeakerphone>
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <img className="size-10 object-cover rounded-full" src={item.authorImage} alt="" />
                                <h2>{item.authorName}</h2>
                            </div>
                        </div>
                        <div className="notibody !pb-2">{item.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Announcement
