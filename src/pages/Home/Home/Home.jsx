import React, { useRef, useState } from "react"
import Banner from "../Banner/Banner"
import AllTags from "../AllTags/AllTags"
import Announcement from "../Announcement/Announcement"
import PostContainer from "../PostContainer/PostContainer"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useMutation } from "@tanstack/react-query"

const Home = () => {
    const [text, setText] = useState("")
    const [hide, setHide] = useState(true)
    const [searchOutput, setSearchOutput] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    const bannerRef = useRef(null)

    const { mutate } = useMutation({
        mutationKey: ["bannerSearch"],
        mutationFn: (text) => {
            setLoading(true)
            axiosPublic(`/bannerSearch?q=${text}`).then((res) => {
                setSearchOutput(res.data)
                setLoading(false)
            })
        },
    })

    const handleSearch = (e) => {
        e.preventDefault()
        setHide(false)
        if (text) {
            mutate(text)
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
                hide={hide}
                setHide={setHide}
                loading={loading}
            ></Banner>
            <AllTags setText={setText} bannerRef={bannerRef}></AllTags>
            <Announcement></Announcement>
            <PostContainer></PostContainer>
        </div>
    )
}

export default Home
