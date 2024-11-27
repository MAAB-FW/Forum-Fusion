import SmallLoading from "@/components/SmallLoading"
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import SinglePost from "@/pages/Home/PostContainer/SinglePost"
import { useQueries } from "@tanstack/react-query"
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

    const isLoading = results.some((result) => result.isLoading)

    const myProfile = results[0].data
    const recentPosts = results[1].data

    if (isLoading) {
        return <SmallLoading />
    }

    return (
        <div className="/min-h-[50vh] pb-6">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">My Profile</h2>
            <div className="flex flex-col sm:flex-row items-center mb-6">
                <img
                    className="w-24 h-24 rounded-full object-cover mr-4"
                    src={user.photoURL}
                    alt={`${user.displayName}'s profile`}
                />
                <div>
                    <h1 className="sm:text-2xl font-bold">{user.displayName}</h1>
                    <p className="text-gray-700 text-sm sm:text-base">{user.email}</p>
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
                {recentPosts.length > 0 ? recentPosts.slice(0, 3).map((post) => (
                    <SinglePost key={post._id} post={post}></SinglePost>
                )):
                <>
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                        <p className="text-xl font-medium text-gray-600">No posts found</p>
                        <p className="mt-2 text-gray-500">You haven&apos;t created any posts yet.</p>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default MyProfile
