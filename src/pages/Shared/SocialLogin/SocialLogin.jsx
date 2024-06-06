import useAuth from "@/hooks/useAuth"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import React from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { useLocation, useNavigate } from "react-router-dom"

export const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleGoogleLogin = () => {
        googleLogin()
            .then((r) => {
                console.log(r.user)
                const userInfo = {
                    userName: r.user.displayName,
                    email: r.user.email,
                    imageUrl: r.user.photoURL,
                }
                navigate(from, { replace: true })
                toast.success("Successfully Logged In!")
                axiosPublic.post("/users", userInfo).then((res) => {
                    console.log(res)
                })
            })
            .catch((e) => {
                console.log(e)
                toast.error("Something went wrong!")
            })
    }

    return (
        <div>
            <button
                onClick={handleGoogleLogin}
                type="button"
                className="inline-flex items-center gap-4 justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
                <FcGoogle className="text-xl" /> Google
            </button>
        </div>
    )
}
