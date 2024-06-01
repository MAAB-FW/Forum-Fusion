import React from "react"
import logo from "/F.Fusion.png"
import { Link } from "react-router-dom"
import { SocialLogin } from "../Shared/SocialLogin/SocialLogin"

const JoinUs = () => {
    return (
        <div className="flex items-center justify-center my-20">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <img src={logo} alt="Logo" className="h-12 w-12" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Join With Us</h2>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
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
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
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
                        Not a member?{" "}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JoinUs
