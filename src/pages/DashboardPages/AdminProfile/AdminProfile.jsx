import useAuth from "@/hooks/useAuth"
import React, { useState } from "react"
import { MdOutlineArticle } from "react-icons/md"
import { FcComments } from "react-icons/fc"
import { FaUsers } from "react-icons/fa"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import { useQuery } from "@tanstack/react-query"
import SmallLoading from "@/components/SmallLoading"

const AdminProfile = () => {
    const { user } = useAuth()
    const [tag, setTag] = useState("")
    const axiosSecure = useAxiosSecure()

    const { data: totalData, isFetching } = useQuery({
        queryKey: ["totalData"],
        queryFn: async () => {
            const res = await axiosSecure("/totalData")
            console.log(res.data)
            return res.data
        },
        initialData: {},
    })
    //TODO: dynamic data
    const data = [
        { name: "Total Posts", value: totalData.totalPosts },
        { name: "Total Comments", value: totalData.totalComments },
        { name: "Total Users", value: totalData.totalUsers },
    ]
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const handleAddTag = async () => {
        const tagText = tag.replace(/ /g, "_")
        if (!tagText) {
            return toast.error("Valid tag name required!")
        }
        try {
            const res = await axiosSecure.post("/tags", { tag: tagText })
            console.log(res.data)
            if (res.data.insertedId) {
                toast.success("Tag Successfully Added!")
                setTag("")
            }
        } catch (e) {
            console.log("error tag ", e)
            toast.error("Something went wrong!")
        }
    }

    if (isFetching) {
        return <SmallLoading />
    }

    return (
        <div className="/min-h-[50vh] /pb-6">
            <h2 className="text-xl mb-6 font-semibold leading-7 text-gray-900">Admin Profile</h2>
            <div className="min-h-screen bg-gray-100 rounded-xl">
                <header className="bg-white rounded-t-xl shadow py-4">
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
                                                <div className="text-lg font-medium text-gray-900">{totalData.totalPosts}</div>
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
                                                <div className="text-lg font-medium text-gray-900">{totalData.totalComments}</div>
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
                                                <div className="text-lg font-medium text-gray-900">{totalData.totalUsers}</div>
                                                <div className="text-sm text-green-500 flex items-center"></div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <ResponsiveContainer width="100%" height="100%"> */}
                <div className="flex items-center justify-center">
                    <PieChart width={250} height={250}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                        <Tooltip />
                    </PieChart>
                </div>
                {/* </ResponsiveContainer> */}

                <div className="pb-8">
                    <div className="w-[95%] mx-auto mt-10 p-4 border rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Add Tags</h2>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Enter tag"
                            />
                            <button onClick={handleAddTag} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
