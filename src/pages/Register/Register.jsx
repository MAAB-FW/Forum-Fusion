import React, { useState } from "react"
import logo from "/F.Fusion.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import { SocialLogin } from "../Shared/SocialLogin/SocialLogin"
import { useForm } from "react-hook-form"
import { ImageUpload } from "@/utils/ImageUpload"
import toast from "react-hot-toast"
import useAxiosPublic from "@/hooks/useAxiosPublic"

const Register = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(false)

    const { registerUser, updateUser, setUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data)
        const userName = data.userName
        const email = data.email
        const password = data.password
        const image = data.image[0]
        const imageUrl = await ImageUpload(image)
        if (imageUrl) {
            const userInfo = { userName, email, imageUrl }
            registerUser(email, password)
                .then((r) => {
                    console.log(r.user)
                    toast.success("Successfully Registered!")
                    if (r.user) {
                        updateUser(userName, imageUrl)
                            .then(() => {
                                setUser({ displayName: userName, photoURL: imageUrl })
                                console.log("profile info updated")
                                navigate(from, { replace: true })
                            })
                            .catch((e) => {
                                console.log(e)
                                toast.error("Something went wrong!")
                            })
                        axiosPublic.post("/users", userInfo).then((res) => {
                            console.log(res)
                        })
                        setLoading(false)
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.error("Something went wrong!")
                    setLoading(false)
                })
        }
    }

    return (
        <div className="flex items-center justify-center my-20">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <img src={logo} alt="Logo" className="h-12 w-12" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Register Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="userName" className="sr-only">
                                User Name
                            </label>
                            <input
                                {...register("userName", {
                                    required: { value: true, message: "This field is required" },
                                })}
                                id="userName"
                                name="userName"
                                type="text"
                                autoComplete="userName"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="User Name"
                            />
                            {errors.userName && (
                                <span className="text-red-600 text-sm font-semibold">{errors.userName.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register("email", {
                                    required: { value: true, message: "This field is required" },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <span className="text-red-600 text-sm font-semibold">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: { value: true, message: "This field is required" },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                                        message: "Password needs 1 uppercase, 1 lowercase, min. 6 chars.",
                                    },
                                })}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <span className="text-red-600 text-sm font-semibold">{errors.password.message}</span>
                            )}
                        </div>
                        <div className="">
                            <label htmlFor="image-upload" className="text-sm text-gray-500">
                                Upload Photo:
                            </label>
                            <input
                                {...register("image", {
                                    required: { value: true, message: "This field is required" },
                                })}
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Upload Image"
                            />
                            {errors.image && <span className="text-red-600 text-sm font-semibold">{errors.image.message}</span>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative disabled:cursor-not-allowed flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-1/3 border-b border-gray-300"></div>
                        <div className="px-2 text-sm text-gray-600 text-nowrap">or, continue with</div>
                        <div className="w-1/3 border-b border-gray-300"></div>
                    </div>
                    <div className="">
                        <SocialLogin></SocialLogin>
                    </div>
                    <div className="text-sm text-center">
                        Already a member?{" "}
                        <Link to="/joinUs" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Join Us
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
