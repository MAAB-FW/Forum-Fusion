import { useQuery } from "@tanstack/react-query"

const useGetTanStackData = (key, param, axios) => {
    const { data } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await axios(`/${key}/${param}`)
            console.log(res)
            return res.data
        },
        initialData: [],
    })
    return { data }
}

export default useGetTanStackData
