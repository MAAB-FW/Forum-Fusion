import { createBrowserRouter } from "react-router-dom"
import App from "@/layout/App"
import Home from "@/pages/Home/Home/Home"
import Membership from "@/pages/Membership/Membership"
import JoinUs from "@/pages/JoinUs/JoinUs"
import Dashboard from "@/layout/Dashboard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/membership",
                element: <Membership></Membership>,
            },
            {
                path: "/joinUs",
                element: <JoinUs></JoinUs>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
    },
])
