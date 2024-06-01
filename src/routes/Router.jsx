import { createBrowserRouter } from "react-router-dom"
import App from "@/layout/App"
import Home from "@/pages/Home/Home/Home"
import Membership from "@/pages/Membership/Membership"

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
        ],
    },
])
