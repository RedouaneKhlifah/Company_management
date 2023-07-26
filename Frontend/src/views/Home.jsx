import { useDispatch, useSelector } from "react-redux";
import {
    Outlet,
    NavLink,
    useLocation,
    Link,
    useNavigate
} from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Main() {
    return (
        <main className="container mt-3 mx-auto grid grid-cols-[auto_1fr] gap-x-3">
            {/* Side bar */}
            <Sidebar />
            {/* End of Side bar */}
            <div>
                {/* Header */}
                <Navbar />
                {/* Pages */}
                <Outlet />
            </div>
        </main>
    );
}

export default Main;
