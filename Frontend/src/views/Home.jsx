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
            {/* <div className="bg-yellow-200 flex flex-col gap-y-6 child:py-1 child:px-4 child:border child:border-black child:rounded-lg">
                <NavLink to="/" className="navlink">
                    Accueil
                </NavLink>
                <NavLink to="jobs" className="navlink">
                    Emplois
                </NavLink>
                <NavLink to="employees" className="navlink">
                    Employées main
                </NavLink>
                <NavLink to="employees/some_id_here" className="navlink">
                    Employées details
                </NavLink>
                <NavLink to="competence" className="navlink">
                    Compétences
                </NavLink>
                <NavLink to="modules" className="navlink">
                    Modules
                </NavLink>
            </div>
            {/* End of Side bar */}
            <div>
                {/* Header */}
                <div className="p-4 bg-gray-200 flex justify-between gap-x-10">
                    <div className="flex gap-x-4">
                        <div
                            className={
                                location.pathname === "/"
                                    ? "text-gray-900"
                                    : "text-gray-400"
                            }
                        >
                            <Link to="/">Home</Link>
                        </div>
                        {crumbs}
                    </div>
                    <div className="flex gap-x-4">
                        <p>{userInfo?.otherInfo?.fullName}</p>
                        <button
                            onClick={logoutHandler}
                            className="px-4 py-1 rounded-md bg-anep-secondary border border-anep-primary-light"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                {/* Pages */}
                <Outlet />
            </div>
        </main>
    );
}

export default Main;
