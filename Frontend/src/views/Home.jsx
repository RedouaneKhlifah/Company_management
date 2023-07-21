import { Outlet, NavLink, useLocation, Link } from "react-router-dom";

function Main() {
    const location = useLocation();
    const pathArr = location.pathname.replace(/^\/|\/$/g, "").split("/");
    let currentLink = "";

    console.log(pathArr.length);
    const crumbs = pathArr.map((crumb, index) => {
        currentLink += `/${crumb}`;

        return (
            <div className={pathArr.length - 1 === index ? "text-gray-900" : "text-gray-400"}>
                <Link to={currentLink}>{crumb}</Link>
            </div>
        );
    });

    return (
        <main className="container mt-3 mx-auto grid grid-cols-[auto_1fr] gap-x-5">
            {/* Side bar */}
            <div className="bg-yellow-200 flex flex-col gap-y-6 child:py-1 child:px-4 child:border child:border-black child:rounded-lg">
                <NavLink to="/" className="navlink">Accueil</NavLink>
                <NavLink to="jobs" className="navlink">Emplois</NavLink>
                <NavLink to="employees" className="navlink">Employées main</NavLink>
                <NavLink to="employees/some_id_here" className="navlink">Employées details</NavLink>
                <NavLink to="skills" className="navlink">Compétences</NavLink>
                <NavLink to="modules" className="navlink">Modules</NavLink>
            </div>
            {/* End of Side bar */}
            <div>
                {/* Header */}
                <div className="p-4 bg-gray-200 flex gap-x-10">
                    <div className={location.pathname === "/" ? "text-gray-900" : "text-gray-400"}>
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
