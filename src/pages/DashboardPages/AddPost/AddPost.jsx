import React from "react"
import { useForm } from "react-hook-form"
import Select from "react-select"

const AddPost = () => {
    const colorOptions = [
        { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
        { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
        { value: "purple", label: "Purple", color: "#5243AA" },
        { value: "red", label: "Red", color: "#FF5630", isFixed: true },
        { value: "orange", label: "Orange", color: "#FF8B00" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
        { value: "green", label: "Green", color: "#36B37E" },
        { value: "forest", label: "Forest", color: "#00875A" },
        { value: "slate", label: "Slate", color: "#253858" },
        { value: "silver", label: "Silver", color: "#666666" },
    ]
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <form>
            <div className="space-y-12">
                <div className=" pb-12">
                    <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Add Post</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This post will be displayed publicly.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        {/* <div className="col-span-full">
                            <label htmlFor="author-image" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Image
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <img src="" alt="Author" className="h-12 w-12 text-gray-300" id="author-image-preview" />
                                <input
                                    id="author-image"
                                    name="author-image"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => {
                                        const reader = new FileReader()
                                        reader.onload = () => {
                                            const img = document.getElementById("author-image-preview")
                                            img.src = reader.result
                                        }
                                        reader.readAsDataURL(e.target.files[0])
                                    }}
                                />
                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={() => document.getElementById("author-image").click()}
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="author-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="author-name"
                                    id="author-name"
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="author-email" className="block text-sm font-medium leading-6 text-gray-900">
                                Author Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="author-email"
                                    id="author-email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        <div className="sm:col-span-6">
                            <label htmlFor="post-title" className="block text-sm font-medium leading-6 text-gray-900">
                                Post Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="post-title"
                                    id="post-title"
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="post-description" className="block text-sm font-medium leading-6 text-gray-900">
                                Post Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="post-description"
                                    name="post-description"
                                    rows={3}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4 ">
                            <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                                Tag
                            </label>
                            <div className="mt-2">
                                <Select
                                    // defaultValue={{ value: "orange", label: "Orange" }}
                                    isMulti
                                    name="colors"
                                    options={colorOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
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
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddPost
