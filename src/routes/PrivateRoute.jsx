import useAuth from "@/hooks/useAuth"
import React from "react"

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return 

    return <div>{children}</div>
}

export default PrivateRoute
