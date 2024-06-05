import LoadingSpinner from "@/components/LoadingSpinner"
import useAuth from "@/hooks/useAuth"
import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { useRole } from "@/hooks/useRole"

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isPending } = useRole()
    const location = useLocation()
    
    if (loading || isPending) return <LoadingSpinner></LoadingSpinner>

    if (user && role === "admin") {
        return children
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
}

export default AdminRoute

AdminRoute.propTypes = {
    children: PropTypes.node,
}
