import Footer from "@/pages/Home/Footer/Footer"
import Navbar from "@/pages/Shared/Navbar/Navbar"
import { Outlet, ScrollRestoration } from "react-router-dom"

function App() {
    return (
        <div className="font-nunito">
            <Navbar></Navbar>
            <div className="max-w-7xl md:w-[85%] w-[90%] mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ScrollRestoration />
        </div>
    )
}

export default App
