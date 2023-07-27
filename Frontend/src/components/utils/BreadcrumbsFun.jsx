import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, Link } from "react-router-dom";

export default function BreadcrumbsFun() {
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
                        ? "text-anep-light"
                        : "text-anep-light/60 hover:text-anep-yellow"
                }
            >
                <Link to={currentLink}>{crumb}</Link>
            </div>
        );
    });

    return (
        <Breadcrumbs className="bg-transparent">
            {/* Render the dynamically generated breadcrumbs */}
            <Link to="/" className={`flex items-center gap-1 hover:text-anep-yellow ${location.pathname === "/" ? "text-anep-light" : "text-anep-light/60"}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <p>Accueil</p>
            </Link>
            {crumbs}
        </Breadcrumbs>
    );
}
