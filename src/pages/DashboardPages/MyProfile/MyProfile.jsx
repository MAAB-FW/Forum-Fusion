import SmallLoading from "@/components/SmallLoading"
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import SinglePost from "@/pages/Home/PostContainer/SinglePost"
import { useQueries } from "@tanstack/react-query"
import React from "react"
import { FaCircle } from "react-icons/fa"
import { FcOk } from "react-icons/fc"

const MyProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    // const { data } = useQuery({
    //     queryKey: ["myProfile"],
    //     queryFn: async () => {
    //         const res = await axiosSecure(`/myProfile/${user.email}`)
    //         console.log(res.data)
    //         return res.data
    //     },
    //     initialData: [],
    // })

    const fetchItem = ["myProfile", "recentPosts"]

    const results = useQueries({
        queries: fetchItem.map((item) => ({
            queryKey: [item],
            queryFn: async () => {
                const res = await axiosSecure(`/${item}/${user.email}`)
                return res.data
            },
        })),
    })

    const isFetching = results.some((result) => result.isFetching)

    const myProfile = results[0].data
    const recentPosts = results[1].data

    if (isFetching) {
        return <SmallLoading />
    }

    return (
        <div className="/min-h-[50vh] pb-6">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">My Profile</h2>
            <div className="flex items-center mb-6">
                <img
                    className="w-24 h-24 rounded-full object-cover mr-4"
                    src={user.photoURL}
                    alt={`${user.displayName}'s profile`}
                />
                <div>
                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                    <p className="text-gray-700">{user.email}</p>
                    <div className="mt-2">
                        <span
                            className={`inline-flex items-center gap-2 uppercase px-3 py-0.5 rounded-full text-sm font-medium ${
                                myProfile.badge === "gold" ? "bg-[#ffd700]" : "bg-[#c77b30]"
                            }`}
                        >
                            {myProfile.badge === "gold" ? <FcOk /> : <FaCircle />}
                            {myProfile.badge}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Recent 3 Posts</h2>
                {recentPosts.slice(0, 3).map((post) => (
                    <SinglePost key={post._id} post={post}></SinglePost>
                ))}
            </div>
        </div>
    )
}

export default MyProfile
