import React, { useRef, useState } from "react"
import Banner from "../Banner/Banner"
import AllTags from "../AllTags/AllTags"
import Announcement from "../Announcement/Announcement"
import PostContainer from "../PostContainer/PostContainer"
import useAxiosPublic from "@/hooks/useAxiosPublic"

const Home = () => {
    const [text, setText] = useState("")
    const [searchOutput, setSearchOutput] = useState([])
    const axiosPublic = useAxiosPublic()
    const bannerRef = useRef(null)
    const handleSearch = (e) => {
        e.preventDefault()
        if (text) {
            axiosPublic(`/bannerSearch?q=${text}`).then((res) => {
                console.log(res.data)
                setSearchOutput(res.data)
            })
        }
    }
    return (
        <div>
            <Banner
                text={text}
                setText={setText}
                searchOutput={searchOutput}
                setSearchOutput={setSearchOutput}
                handleSearch={handleSearch}
                bannerRef={bannerRef}
            ></Banner>
            <AllTags setText={setText} bannerRef={bannerRef}></AllTags>
            <Announcement></Announcement>
            <PostContainer></PostContainer>
        </div>
    )
}

export default Home
