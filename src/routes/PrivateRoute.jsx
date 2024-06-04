import LoadingSpinner from "@/components/LoadingSpinner"
import useAuth from "@/hooks/useAuth"
import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types"

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <LoadingSpinner></LoadingSpinner>

    if (user) {
        return children
    }

    return <Navigate to="/joinUs" state={{ from: location }} replace></Navigate>
}

export default PrivateRoute

PrivateRoute.propTypes = {
    children: PropTypes.node,
}
