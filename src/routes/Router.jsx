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
import AdminProfile from "@/pages/DashboardPages/AdminProfile/AdminProfile"
import ManageUsers from "@/pages/DashboardPages/ManageUsers/ManageUsers"
import ReportedComments from "@/pages/DashboardPages/ReportedComments/ReportedComments"
import MakeAnnouncement from "@/pages/DashboardPages/MakeAnnouncement/MakeAnnouncement"
import AdminRoute from "./AdminRoute"

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
                element: (
                    <PrivateRoute>
                        <CommentsTable></CommentsTable>
                    </PrivateRoute>
                ),
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
                element: (
                    <PrivateRoute>
                        <MyProfile></MyProfile>
                    </PrivateRoute>
                ),
            },
            {
                path: "addPost",
                element: (
                    <PrivateRoute>
                        <AddPost></AddPost>
                    </PrivateRoute>
                ),
            },
            {
                path: "myPosts",
                element: (
                    <PrivateRoute>
                        <MyPosts></MyPosts>
                    </PrivateRoute>
                ),
            },
            // admin routes
            {
                path: "adminProfile",
                element: (
                    <AdminRoute>
                        <AdminProfile></AdminProfile>
                    </AdminRoute>
                ),
            },
            {
                path: "manageUsers",
                element: (
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                ),
            },
            {
                path: "reportedComments",
                element: (
                    <AdminRoute>
                        <ReportedComments></ReportedComments>
                    </AdminRoute>
                ),
            },
            {
                path: "makeAnnouncement",
                element: (
                    <AdminRoute>
                        <MakeAnnouncement></MakeAnnouncement>
                    </AdminRoute>
                ),
            },
        ],
    },
])
