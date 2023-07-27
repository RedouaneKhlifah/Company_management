import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setCompetence } from "../slices/competenceSlice";
// import axios from "axios";

function Main() {
    // const dispatch = useDispatch();
    // const url = "http://localhost:5000/api/competence";
    // // Dispatch competence data to the Redux store when the component mounts
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get(url);
    //         console.log(response.data);
    //         const competenceData = response.data.competencesWithModule;
    //         dispatch(setCompetence(competenceData));
    //     };
    //     fetchData();
    // }, []);

    const location = useLocation();
    const pathArr = location.pathname.replace(/^\/|\/$/g, "").split("/");
    let currentLink = "";

    console.log(pathArr.length);
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
            </div> */}
            {/* End of Side bar */}
            <div>
                {/* Header */}
                <div className="p-4 bg-gray-200 flex gap-x-10">
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
                {/* Pages */}
                <Outlet />
            </div>
        </main>
    );
}

export default Main;
