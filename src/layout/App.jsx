import Navbar from "@/pages/Shared/Navbar/Navbar"
import { Outlet } from "react-router-dom"

function App() {
    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default App
