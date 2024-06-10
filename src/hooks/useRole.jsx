import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"

export const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: role, isPending } = useQuery({
        queryKey: ["role", user],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/role/${user.email}`)
            // console.log(res.data.role)
            return res.data.role
        },
    })

    return { role, isPending }
}
