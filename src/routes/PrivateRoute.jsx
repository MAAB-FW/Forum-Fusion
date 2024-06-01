import LoadingSpinner from "@/components/LoadingSpinner"
import useAuth from "@/hooks/useAuth"
import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <LoadingSpinner></LoadingSpinner>

    if (!user) {
        return <Navigate to="/joinUs" state={{ from: location }} replace></Navigate>
    }

    return <div>{children}</div>
}

export default PrivateRoute
