import Footer from "@/pages/Home/Home/Footer/Footer"
import Navbar from "@/pages/Shared/Navbar/Navbar"
import { Outlet } from "react-router-dom"

function App() {
    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-7xl md:w-[85%] w-[90%]  mx-auto">
                <Outlet></Outlet>
            </div>
                <Footer></Footer>
        </>
    )
}

export default App
