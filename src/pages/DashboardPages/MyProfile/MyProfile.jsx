import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import SinglePost from "@/pages/Home/PostContainer/SinglePost"
import { useQuery } from "@tanstack/react-query"
import React from "react"

const MyProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data } = useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            const res = await axiosSecure(`/myProfile/${user.email}`)
            console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    const recentPosts = [
        { id: 1, title: "Post One", content: "This is the content of the first post." },
        { id: 2, title: "Post Two", content: "This is the content of the second post." },
        { id: 3, title: "Post Three", content: "This is the content of the third post." },
        { id: 4, title: "Post Three", content: "This is the content of the third post." },
    ]

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
                            className={`inline-flex items-center uppercase px-3 py-0.5 rounded-full text-sm font-medium ${
                                data.badge === "gold" ? "bg-[#ffd700]" : "bg-[#c77b30]"
                            }`}
                        >
                            {data.badge}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                {recentPosts.slice(0, 3).map((post, id) => (
                    <SinglePost key={id}></SinglePost>
                ))}
            </div>
        </div>
    )
}

export default MyProfile
