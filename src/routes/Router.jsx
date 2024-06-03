import { createBrowserRouter } from "react-router-dom"
import App from "@/layout/App"
import Home from "@/pages/Home/Home/Home"
import Membership from "@/pages/Membership/Membership"
import JoinUs from "@/pages/JoinUs/JoinUs"
import Dashboard from "@/layout/Dashboard"
import Register from "@/pages/Register/Register"
import PrivateRoute from "./PrivateRoute"
import PostDetails from "@/pages/PostDetails/PostDetails"
import MyProfile from "@/pages/DashboardPages/MyProfile/MyProfile"
import AddPost from "@/pages/DashboardPages/AddPost/AddPost"
import MyPosts from "@/pages/DashboardPages/MyPosts/MyPosts"
import ErrorPage from "@/layout/ErrorPage"
import CommentsTable from "@/pages/Home/CommentsTable/CommentsTable"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/membership",
                element: (
                    <PrivateRoute>
                        <Membership></Membership>
                    </PrivateRoute>
                ),
            },
            {
                path: "/post/:id",
                element: <PostDetails></PostDetails>,
            },
            {
                path: "/comments/:id",
                element: <CommentsTable></CommentsTable>,
            },
            {
                path: "/joinUs",
                element: <JoinUs></JoinUs>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // general user routes
            {
                path: "myProfile",
                index: true,
                element: <MyProfile></MyProfile>,
            },
            {
                path: "addPost",
                element: <AddPost></AddPost>,
            },
            {
                path: "myPosts",
                element: <MyPosts></MyPosts>,
            },
            // admin routes
            {},
        ],
    },
])
