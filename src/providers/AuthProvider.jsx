import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import LoadingSpinner from "@/components/LoadingSpinner"
import app from "@/firebase/firebase.config"
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [firstLoad, setFirstLoad] = useState(false)

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, imageUrl) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl,
        })
    }

    const joinUsUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = { user, loading, registerUser, updateUser, logoutUser, joinUsUser }
    if (firstLoad) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node,
}
