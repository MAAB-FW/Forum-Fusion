import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import LoadingSpinner from "@/components/LoadingSpinner"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [firstLoad, setFirstLoad] = useState(false)

    const authInfo = { user, loading }
    if (firstLoad) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node,
}
