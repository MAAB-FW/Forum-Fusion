import React from "react"
import Banner from "../Banner/Banner"
import AllTags from "../AllTags/AllTags"
import Announcement from "../Announcement/Announcement"
import PostContainer from "../PostContainer/PostContainer"

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllTags></AllTags>
            <Announcement></Announcement>
            <PostContainer></PostContainer>
        </div>
    )
}

export default Home
