import useAuth from "@/hooks/useAuth"
import React from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"

export const SocialLogin = () => {
    const { googleLogin } = useAuth()

    const handleGoogleLogin = () => {
        googleLogin()
            .then((r) => {
                console.log(r.user)
                toast.success("Successfully Logged In!")
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
