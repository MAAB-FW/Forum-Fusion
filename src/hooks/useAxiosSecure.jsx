import axios from "axios"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logoutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                console.log("passed")
                // Any status code that lie within the range of 2xx cause this  to =>trigger
                // Do something with response data
                return res
            },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    logoutUser()
                        .then(() => {
                            navigate("/joinUs")
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                    return console.log("logout user")
                }
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error)
            },
        )
    }, [logoutUser, navigate])

    return axiosSecure
}

export default useAxiosSecure
