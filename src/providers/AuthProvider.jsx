import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import LoadingSpinner from "@/components/LoadingSpinner"
import app from "@/firebase/firebase.config"
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth"
import useAxiosPublic from "@/hooks/useAxiosPublic"

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [firstLoad, setFirstLoad] = useState(true)
    const axiosPublic = useAxiosPublic()

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

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
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
            if (currentUser) {
                axiosPublic.post("/jwt", { email: currentUser?.email }, { withCredentials: true }).then((res) => {
                    console.log(res.data)
                    setLoading(false)
                    setFirstLoad(false)
                })
            } else {
                axiosPublic.post("/logout", { email: currentUser?.email }, { withCredentials: true }).then((res) => {
                    console.log(res.data)
                    setLoading(false)
                    setFirstLoad(false)
                })
            }
        })

        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    const authInfo = { user, loading, registerUser, updateUser, logoutUser, joinUsUser, setUser, googleLogin }
    if (firstLoad) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node,
}
