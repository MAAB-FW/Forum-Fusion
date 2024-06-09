import SmallLoading from "@/components/SmallLoading"
import useAuth from "@/hooks/useAuth"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import { useQueries, useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Select from "react-select"
import { CgSpinner } from "react-icons/cg"

const AddPost = () => {
    const { user } = useAuth()
    // const myPosts = 5
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const navigate = useNavigate()
    const [posting, setPosting] = useState(false)
    const { data: tags } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosPublic("/tags")
            // console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    const fetchItem = ["myProfile", "myPosts"]

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
    const myPosts = results[1].data

    const options = [
        ...tags.map((tag) => ({ value: tag.tag, label: tag.tag, name: tag.tag })),
        // { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    ]

    const { register, handleSubmit, control } = useForm()

    const onSubmit = async (data) => {
        const postData = {
            ...data,
            authorName: user.displayName,
            authorImage: user.photoURL,
            authorEmail: user.email,
            upVote: 0,
            downVote: 0,
            commentsCount: 0,
            postTime: new Date(),
        }
        try {
            setPosting(true)
            const res = await axiosSecure.post("/addPost", postData)
            console.log(res.data)
            if (res.data.insertedId) toast.success("Post Added Successfully!")
            navigate("/")
            setPosting(false)
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong!")
            setPosting(false)
        }
    }

    if (isFetching) {
        return <SmallLoading />
    }

    if (myPosts?.length >= 5 && myProfile.badge !== "gold") {
        return (
            <>
                <div className="fixed p-4 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
                    <div className="bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
                        <div className="bg-white rounded-t-2xl px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Post Limit Reached</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">
                                            You can post up to 5 times with a Bronze badge. Upgrade to a Gold badge for unlimited
                                            posts.
                                        </p>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Go to the membership page to become a Gold badge member.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-b-2xl px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Link
                                to="/membership"
                                state={{ from: location }}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                // onClick={onDelete}
                            >
                                Become a Member
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Add Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <p className="mt-1 text-sm leading-6 text-gray-600">This post will be displayed publicly.</p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-full flex flex-col items-center lg:items-start">
                            <label htmlFor="authorImage" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Image
                            </label>
                            <div className="mt-2">
                                <img
                                    name="authorImage"
                                    src={user.photoURL}
                                    disabled
                                    id="authorImage"
                                    autoComplete="name"
                                    className="block px-2 size-20 object-cover rounded-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="authorName" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="authorName"
                                    defaultValue={user.displayName}
                                    disabled
                                    readOnly
                                    id="authorName"
                                    autoComplete="name"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="authorEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="authorEmail"
                                    defaultValue={user.email}
                                    disabled
                                    readOnly
                                    id="authorEmail"
                                    autoComplete="email"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="postTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                Post Title<span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("postTitle", { required: true })}
                                    type="text"
                                    name="postTitle"
                                    required
                                    id="postTitle"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="postDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                Post Description<span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    {...register("postDescription", { required: true })}
                                    id="postDescription"
                                    name="postDescription"
                                    required
                                    rows={3}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4 ">
                            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                Tag<span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            required
                                            name="colors"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    )}
                                />
                                {/* <select
                                    id="tag"
                                    name="tag"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Technology</option>
                                    <option>Science</option>
                                    <option>Art</option>
                                    <option>Literature</option>
                                </select> */}
                            </div>
                        </div>

                        {/* <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">UpVote</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="upvote"
                                    id="upvote"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={0}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">DownVote</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="downvote"
                                    id="downvote"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={0}
                                    readOnly
                                />
                            </div>
                        </div> */}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            disabled={posting}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {posting ? <CgSpinner className="animate-spin text-xl w-8" /> : "Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPost
