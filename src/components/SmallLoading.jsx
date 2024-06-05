import React from "react"
import { ScaleLoader } from "react-spinners"

const SmallLoading = () => {
    return (
        <div>
            <div className="flex justify-center h-full">
                <ScaleLoader className="my-28" color="#1ea7fd" size={100} />
            </div>
        </div>
    )
}

export default SmallLoading
