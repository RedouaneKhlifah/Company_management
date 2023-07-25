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
    const { userInfo } = useSelector((state) => state.auth);
    const expires = localStorage.getItem("expiresAt");

    // ##########################

    const location = useLocation();
    const pathArr = location.pathname.replace(/^\/|\/$/g, "").split("/");
    let currentLink = "";

    const crumbs = pathArr.map((crumb, index) => {
        currentLink += `/${crumb}`;
        const key = `crumb-${index}`;

        return (
            <div
                key={key}
                className={
                    pathArr.length - 1 === index
                        ? "text-gray-900"
                        : "text-gray-400"
                }
            >
                <Link to={currentLink}>{crumb}</Link>
            </div>
        );
    });

    // ##########################

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate("/signin");
        } catch (error) {
            console.log("logout error");
        }
    };

    useState(() => {
        if (expires < Date.now()) {
            (async function () {
                try {
                    await logout().unwrap();
                    dispatch(clearCredentials());
                } catch (error) {
                    toast.error("Une erreur s'est produite.");
                }
            })();
        }
    }, [expires, dispatch]);

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
