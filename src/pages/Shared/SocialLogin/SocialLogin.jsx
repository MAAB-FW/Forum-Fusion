import React from "react"
import { FcGoogle } from "react-icons/fc"

export const SocialLogin = () => {
    return (
        <div>
            <button
                type="button"
                className="inline-flex items-center gap-4 justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
                <FcGoogle className="text-xl" /> Google
            </button>
        </div>
    )
}
