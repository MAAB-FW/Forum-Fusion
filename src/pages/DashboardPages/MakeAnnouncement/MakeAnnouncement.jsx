import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const MakeAnnouncement = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const [posting, setPosting] = useState(false)

    const onSubmit = async (data) => {
        // console.log(data)
        setPosting(true)
        axiosSecure
            .post("/makeAnnouncement", {
                ...data,
                authorName: user?.displayName,
                authorImage: user?.photoURL,
                postTime: new Date(),
            })
            .then((res) => {
                // console.log(res.data)
                if (res.data.insertedId) {
                    toast.success("Announcement Successfully Posted!")
                    reset()
                    navigate("/")
                }
                setPosting(false)
            })
            .catch((e) => {
                console.log(e)
                toast.error("Something went wrong!")
                setPosting(false)
            })
    }
    return (
        <div className="min-h-screen pb-12">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <p className="mt-1 text-sm leading-6 text-gray-600">Post an announcement on the website.</p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="author-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="author-name"
                                    defaultValue={user.displayName}
                                    disabled
                                    id="author-name"
                                    autoComplete="name"
                                    className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 flex flex-col items-center">
                            <label htmlFor="author-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Image
                            </label>
                            <div className="mt-2">
                                <img
                                    name="author-name"
                                    src={user.photoURL}
                                    disabled
                                    id="author-name"
                                    autoComplete="name"
                                    className="block px-2 size-20 object-cover rounded-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title<span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    name="title"
                                    required
                                    id="title"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description<span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    {...register("description", { required: true })}
                                    id="description"
                                    name="description"
                                    required
                                    rows={3}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            disabled={posting}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Make Announcement
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MakeAnnouncement
