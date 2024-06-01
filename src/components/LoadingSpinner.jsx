import React from "react"
import { BeatLoader } from "react-spinners"

const LoadingSpinner = () => {
    return (
        <div className={`flex justify-center items-center h-screen`}>
            <BeatLoader className="" color="#7e22ce" size={25} />
        </div>
    )
}

export default LoadingSpinner
