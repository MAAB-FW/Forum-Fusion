import useAuth from "@/hooks/useAuth"
import React from "react"
import { MdOutlineArticle } from "react-icons/md"
import { FcComments } from "react-icons/fc"
import { FaUsers } from "react-icons/fa"

const AdminProfile = () => {
    const { user } = useAuth()
    return (
        <div className="/min-h-[50vh] /pb-6">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Admin Profile</h2>
            <div className="/min-h-screen bg-gray-100">
                <header className="bg-white shadow py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <img className="h-8 w-8 object-cover rounded-full" src={user?.photoURL} alt="Admin Profile" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 text-4xl">
                                        <MdOutlineArticle />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">550</div>
                                                <div className="text-sm text-green-500 flex items-center"></div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 text-4xl">
                                        <FcComments />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Comments</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">9,056</div>
                                                <div className="text-sm text-green-500 flex items-center"></div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 text-4xl">
                                        <FaUsers />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">107</div>
                                                <div className="text-sm text-green-500 flex items-center"></div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminProfile
